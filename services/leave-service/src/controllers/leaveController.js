import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import axios from "axios";
import logger from '../utils/logger.js'; // Import the logger utility
import { sendLeaveRequestNotification, sendLeaveApprovalNotification, sendRejectionNotification } from '../utils/notificationUtils.js'; // Assuming notificationUtils sends notifications

export const createLeaveRequest = async (req, res) => {
  try {
    const { reason, fromDate, toDate, flowType } = req.body;
    const { id: userId, role, department, email, name } = req.user;

    if (role !== 'student') {
      logger.warn(`Unauthorized leave request attempt by user ID: ${userId}, role: ${role}`);
      return res.status(403).json({ message: 'Only students can request leave' });
    }

    // Create the leave request with default status and stage
    const leaveRequest = await prisma.leave.create({
      data: {
        userId,
        reason,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        flowType: flowType || 'standard',
        status: 'pending',
        department,
        currentStage: flowType === 'hostel_direct' ? 'hostel' : 'department',
      },
    });

    logger.info(`Leave request created successfully for user ID: ${userId}, leave ID: ${leaveRequest.id}`);

    const payload = {
      userId,
      email,
      name,
      role,
      department,
      leaveRequest,
    };

    // Find the right admin(s) to notify
    const targetRole = flowType === 'hostel_direct' ? 'hostel_admin' : 'department_admin';
    const queryParams = flowType === 'hostel_direct' ? '' : `&department=${department}`;

    const { data: admins } = await axios.get(`http://localhost:3000/api/auth/admins?role=${targetRole}${queryParams}`);

    if (!admins || admins.length === 0) {
      logger.warn(`No admin found to notify for leave request ID: ${leaveRequest.id}`);
      return res.status(404).json({ message: 'No admin found to notify' });
    }

    // Notify all matched admins
    for (const admin of admins) {
      await sendLeaveRequestNotification(admin, payload);
    }

    logger.info(`Notifications sent to admins for leave request ID: ${leaveRequest.id}`);
    return res.status(201).json({
      message: 'Leave request submitted successfully',
      leave: leaveRequest,
    });
  } catch (error) {
    logger.error('Error creating leave request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const approveLeaveRequest = async (req, res) => {
  const { leaveId } = req.params;
  const { user } = req; // From JWT middleware

  try {
    const leaveRequest = await prisma.leave.findUnique({
      where: { id: leaveId },
    });

    if (!leaveRequest) {
      logger.warn(`Leave request not found for ID: ${leaveId}`);
      return res.status(404).json({ message: 'Leave request not found' });
    }

    const { currentStage, flowType, department, status } = leaveRequest;

    if (status === 'approved' || status === 'rejected') {
      logger.warn(`Leave request ID: ${leaveId} already processed`);
      return res.status(400).json({ message: 'Leave already processed' });
    }

    let nextStage = '';
    let allow = false;

    if (flowType === 'standard') {
      if (currentStage === 'department' && user.role === 'department_admin' && user.department === department) {
        nextStage = 'academic';
        allow = true;
      } else if (currentStage === 'academic' && user.role === 'academic_admin') {
        nextStage = 'hostel';
        allow = true;
      } else if (currentStage === 'hostel' && user.role === 'hostel_admin') {
        nextStage = 'done';
        allow = true;
      }
    } else if (flowType === 'hostel_direct') {
      if (currentStage === 'hostel' && user.role === 'hostel_admin') {
        nextStage = 'done';
        allow = true;
      }
    }

    if (!allow) {
      logger.warn(`Unauthorized approval attempt for leave ID: ${leaveId} by user ID: ${user.id}`);
      return res.status(403).json({ message: 'You are not authorized to approve this leave at this stage' });
    }

    await prisma.leave.update({
      where: { id: leaveId },
      data: {
        currentStage: nextStage,
        status: nextStage === 'done' ? 'approved' : 'forwarded',
        updatedAt: new Date(),
      },
    });

    logger.info(`Leave request ID: ${leaveId} moved to stage: ${nextStage}`);

    if (nextStage === 'done') {
      const response = await axios.get(`http://localhost:3000/api/auth/user?userId=${leaveRequest.userId}`);
      const student = response.data;
      await sendLeaveApprovalNotification(leaveRequest.userId, {
        approvedBy: user.name,
        currentStage: nextStage,
        status: 'approved',
        leaveRequest,
        email: student.email,
      });
      logger.info(`Approval notification sent to student ID: ${leaveRequest.userId}`);
    }

    if (nextStage !== 'done') {
      const nextRole = nextStage === 'academic' ? 'academic_admin' :
                       nextStage === 'hostel' ? 'hostel_admin' : null;

      const queryParams = nextRole === 'academic_admin'
        ? `role=${nextRole}`
        : `role=${nextRole}&department=${department}`;

      const { data: nextAdmins } = await axios.get(`http://localhost:3000/api/auth/admins?${queryParams}`);

      for (const admin of nextAdmins) {
        await sendLeaveRequestNotification(admin, {
          userId: leaveRequest.user.id,
          email: leaveRequest.user.email,
          name: leaveRequest.user.name,
          role: leaveRequest.user.role,
          department,
          leaveRequest,
        });
      }

      logger.info(`Notifications sent to next stage admins for leave ID: ${leaveId}`);
    }

    return res.status(200).json({ message: `Leave request moved to ${nextStage}` });
  } catch (error) {
    logger.error('Error approving leave request:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const rejectLeaveRequest = async (req, res) => {
  const { leaveRequestId } = req.params;

  try {
    const leaveRequest = await prisma.leave.findUnique({
      where: { id: leaveRequestId },
    });

    if (!leaveRequest) {
      logger.warn(`Leave request not found for ID: ${leaveRequestId}`);
      return res.status(404).json({ error: 'Leave request not found' });
    }

    const { flowType, department, userId, reason, fromDate, toDate } = leaveRequest;
    let { currentStage } = leaveRequest;

    let allowRejection = false;

    if (flowType === 'standard') {
      if (currentStage === 'department' && req.user.role === 'department_admin' && req.user.department === department) {
        allowRejection = true;
      } else if (currentStage === 'academic' && req.user.role === 'academic_admin') {
        allowRejection = true;
      } else if (currentStage === 'hostel' && req.user.role === 'hostel_admin') {
        allowRejection = true;
      }
    } else if (flowType === 'hostel_direct') {
      if (currentStage === 'hostel' && req.user.role === 'hostel_admin') {
        allowRejection = true;
        currentStage = 'hostel';
      }
    }

    if (!allowRejection) {
      logger.warn(`Unauthorized rejection attempt for leave ID: ${leaveRequestId} by user ID: ${req.user.id}`);
      return res.status(403).json({ error: 'You are not authorized to reject this leave request at this stage' });
    }

    const updatedLeaveRequest = await prisma.leave.update({
      where: { id: leaveRequestId },
      data: {
        status: 'rejected',
        currentStage: currentStage,
        updatedAt: new Date(),
      },
    });

    const response = await axios.get(`http://localhost:3000/api/auth/user?userId=${userId}`);
    const student = response.data;

    const message = `Hello ${student.name}, your leave request for the period ${fromDate} to ${toDate} has been rejected.\n\nReason: ${reason}`;
    await sendRejectionNotification(student, message);

    logger.info(`Leave request ID: ${leaveRequestId} rejected and notification sent to student ID: ${userId}`);
    res.status(200).json({ success: 'Leave request rejected successfully' });
  } catch (error) {
    logger.error('Error rejecting leave request:', error);
    res.status(500).json({ error: 'Failed to reject leave request' });
  }
};

export const getLeaveById = async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leave = await prisma.leave.findUnique({
      where: { id: leaveId },
    });

    if (!leave) {
      logger.warn(`Leave not found for ID: ${leaveId}`);
      return res.status(404).json({ message: 'Leave not found' });
    }

    logger.info(`Leave fetched successfully for ID: ${leaveId}`);
    return res.status(200).json(leave);
  } catch (error) {
    logger.error('Error fetching leave:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getAllLeaveRequests = async (req, res) => {
  try {
    const { role, department } = req.user;

    let leaves;

    if (role === 'department_admin') {
      leaves = await prisma.leave.findMany({
        where: { department },
        orderBy: { createdAt: 'desc' },
      });
    } else if (['super_admin', 'academic_admin', 'hostel_admin'].includes(role)) {
      leaves = await prisma.leave.findMany({
        orderBy: [
          { department: 'asc' },
          { createdAt: 'desc' },
        ],
      });
    } else {
      logger.warn(`Access denied for user ID: ${req.user.id}, role: ${role}`);
      return res.status(403).json({ message: 'Access denied' });
    }

    logger.info(`Leave requests fetched successfully for role: ${role}`);
    return res.status(200).json(leaves);
  } catch (error) {
    logger.error('Error fetching leave requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
