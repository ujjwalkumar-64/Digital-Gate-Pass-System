import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

import { sendLeaveRequestNotification , sendLeaveApprovalNotification, sendRejectionNotification} from '../utils/notificationUtils.js'; // Assuming notificationUtils sends notifications


export const createLeaveRequest = async (req, res) => {
  try {
    const { reason, fromDate, toDate, flowType } = req.body;
    const { id: userId, role, department, email,name } = req.user;

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
        currentStage: flowType === 'hostel_direct' ? 'hostel' : 'department'
      }
    });

    const payload = {
      userId,
      email,
      name,
      role,
      department,
      leaveRequest
    }

    // 2. Find the right admin(s) to notify
    const targetRole = flowType === 'hostel_direct' ? 'hostel_admin' : 'department_admin';
    const queryParams = flowType === 'hostel_direct' ? '' : `&department=${department}`;

    const { data: admins } = await axios.get(`http://localhost:5005/api/auth/admins?role=${targetRole}${queryParams}`);
    
    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: 'No admin found to notify' });
    }

    // 3. Notify all matched admins
    for (const admin of admins) {
      await sendLeaveRequestNotification(admin, payload);
    }

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

        // 1. ✅ Notify student (email + socket)
        await sendLeaveApprovalNotification(leaveRequest.user, {
          approvedBy: user.name,
          currentStage: nextStage,
          status: nextStage === 'done' ? 'approved' : 'forwarded',
          leaveRequest,
        });


    if (nextStage !== 'done') {
      const nextRole = nextStage === 'academic' ? 'academic_admin' :
                       nextStage === 'hostel' ? 'hostel_admin' : null;

      const queryParams = nextRole === 'academic_admin'
        ? `role=${nextRole}`
        : `role=${nextRole}&department=${department}`;

      const { data: nextAdmins } = await axios.get(`http://localhost:5000/api/users/admins?${queryParams}`);

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
    }
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

    const  data = await axios.get(`http://localhost:5000/api/users/admins?${userId}`);
    // Prepare rejection notification message
    const message = `Hello ${data.name} your leave request for the period ${fromDate} to ${toDate} has been rejected.\n\n Reason: ${reason}`;
 
    await sendRejectionNotification(data, message);
 
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
