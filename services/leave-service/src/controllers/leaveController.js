import { PrismaClient } from '@prisma/client';
import { sendLeaveRequestNotification , sendApprovalNotification, sendRejectionNotification} from '../utils/notificationUtils'; // Assuming notificationUtils sends notifications

const prisma = new PrismaClient();

export const createLeaveRequest = async (req, res) => {
  const { userId, reason, fromDate, toDate, leaveType, workflowType } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create leave request with initial stage as 'department'
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        userId,
        reason,
        fromDate,
        toDate,
        leaveType,
        workflowType,
        currentStage: 'department', // Initial stage is department
        approvals: JSON.stringify({}),
      },
    });

    // Send notification about new leave request
    await sendLeaveRequestNotification(userId, leaveRequest);

    return res.status(201).json(leaveRequest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const approveLeaveRequest = async (req, res) => {
  const { leaveId, adminId, department } = req.body;

  try {
    // Find the leave request by ID
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: leaveId },
    });

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Get the current stage of the leave request
    const { currentStage, workflowType } = leaveRequest;

    // Validate the current stage and allow approval based on it
    let newStage = '';
    if (currentStage === 'department' && department === 'department') {
      newStage = 'academic';
    } else if (currentStage === 'academic') {
      newStage = 'hostel';
    } else if (currentStage === 'hostel') {
      newStage = 'done';
    } else if (workflowType === 'hostel_direct' && currentStage === 'department') {
      newStage = 'done'; // Special case where hostel direct skips department and academic
    } else {
      return res.status(400).json({ message: 'Invalid stage for approval' });
    }

    // Update the current stage
    await prisma.leaveRequest.update({
      where: { id: leaveId },
      data: {
        currentStage: newStage,
        approvals: {
          update: {
            [newStage]: new Date(),
          },
        },
      },
    });

    // Send notification about the approval
    await sendApprovalNotification(adminId, leaveRequest.userId, newStage);

    return res.status(200).json({ message: `Leave request moved to ${newStage} stage` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const rejectLeaveRequest = async (req, res) => {
  const { leaveRequestId } = req.params; // Get leave request ID from route params

  try {
    // Fetch the leave request from the database
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: leaveRequestId },
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Update the status to 'rejected'
    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: leaveRequestId },
      data: {
        status: 'rejected',
      },
    });

    // Prepare rejection notification message
    const message = `Your leave request for the period ${updatedLeaveRequest.fromDate} to ${updatedLeaveRequest.toDate} has been rejected. Reason: ${updatedLeaveRequest.reason}`;

    // Send rejection notification to the user
    await sendRejectionNotification(leaveRequest.userId,message);

    // Return success response
    res.status(200).json({ success: 'Leave request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting leave request:', error);
    res.status(500).json({ error: 'Failed to reject leave request' });
  }
};

 
export const myLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leaveRequest.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaves', error: err.message });
  }
};
