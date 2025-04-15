import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

import { sendLeaveRequestNotification , sendApprovalNotification, sendRejectionNotification} from '../utils/notificationUtils.js'; // Assuming notificationUtils sends notifications


export const createLeaveRequest = async (req, res) => {
  try {
    const { reason, fromDate, toDate, flowType } = req.body;
    const { id: userId, role, department } = req.user;

    if(role !== 'student'){
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
        currentStage:'department'
      }
    });

    // Send leave notification to department_admin or hostel_admin based on flow
    // await sendLeaveRequestNotification(userId, leaveRequest);

    return res.status(201).json({
      message: 'Leave request submitted successfully',
      leave: leaveRequest
    });
  } catch (error) {
    console.error('Create Leave Request Error:', error);
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
      return res.status(404).json({ message: 'Leave request not found' });
    }

    const { currentStage, flowType, department, status } = leaveRequest;

    if (status === 'approved' || status === 'rejected') {
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
      if (currentStage === 'department' && user.role === 'hostel_admin') {
        nextStage = 'done';
        allow = true;
      }
    }

    if (!allow) {
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

    // await sendApprovalNotification(user.id, leaveRequest.userId, nextStage);

    return res.status(200).json({ message: `Leave request moved to ${nextStage}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const rejectLeaveRequest = async (req, res) => {
  const { leaveRequestId } = req.params; // Get leave request ID from route params

  try {
    // Fetch the leave request from the database
    const leaveRequest = await prisma.leave.findUnique({
      where: { id: leaveRequestId },
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Extract leave request details
    const {  flowType, department, userId, reason, fromDate, toDate } = leaveRequest;
    let {currentStage} = leaveRequest;

    let allowRejection = false;
    
    // Check if the admin has authorization to reject based on the current stage and flowType
    if (flowType === 'standard') {
      if (currentStage === 'department' && req.user.role === 'department_admin' && req.user.department === department) {
        allowRejection = true;
      } else if (currentStage === 'academic' && req.user.role === 'academic_admin') {
        allowRejection = true;
      } else if (currentStage === 'hostel' && req.user.role === 'hostel_admin') {
        allowRejection = true;
      }
    } else if (flowType === 'hostel_direct') {
      if (currentStage === 'department' && req.user.role === 'hostel_admin') {
        allowRejection = true;
        currentStage='hostel';
      }
    }

    if (!allowRejection) {
      return res.status(403).json({ error: 'You are not authorized to reject this leave request at this stage' });
    }

    // Update the leave request status to 'rejected'
    const updatedLeaveRequest = await prisma.leave.update({
      where: { id: leaveRequestId },
      data: {
        status: 'rejected',
        currentStage:currentStage,
        updatedAt: new Date(), // Update the time of rejection
      },
    });

    // Prepare rejection notification message
    const message = `Your leave request for the period ${fromDate} to ${toDate} has been rejected. Reason: ${reason}`;

    // Send rejection notification to the user
    // await sendRejectionNotification(userId, message);

    // Return success response
    res.status(200).json({ success: 'Leave request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting leave request:', error);
    res.status(500).json({ error: 'Failed to reject leave request' });
  }
};


export const getLeaveById = async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leave = await prisma.leave.findUnique({
      where: { id:leaveId },
       
    });

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    return res.status(200).json(leave);
  } catch (error) {
    console.error('Error fetching leave:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// check
export const getAllLeaveRequests = async (req, res) => {
  try {
    const { role, department } = req.user;

    let leaves;

    if (role ===  'department_admin') {
      leaves = await prisma.leave.findMany({ 
        where: { department },
        orderBy: { createdAt: 'desc' }
      });
      
    } else if (['super_admin', 'academic_admin', 'hostel_admin'].includes(role)) {
      leaves = await prisma.leave.findMany({     
        orderBy:[
          { department:'asc'},
           { createdAt: 'desc' }
          ]
      });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.status(200).json(leaves);
  } catch (error) {
    console.error('Fetch leave error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const userInfo = await axios.get(`http://auth-service/api/users/${leave.userId}`);
