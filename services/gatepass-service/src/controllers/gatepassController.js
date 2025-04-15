import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import axios from 'axios';
import { sendGatePassIssuedNotification,sendGatePassUsedNotification , sendGatePassExpiredNotification} from '../utils/notificationUtils.js'; // Assuming notificationUtils sends notifications

 

export const issueGatePass = async (req, res) => {
  const hostelAdminId = req.user.id; 
  const {leaveId}= req.params;
  console.log(leaveId);

  try {
   
    const response =  await axios.get(`http://localhost:3002/api/leave/${leaveId}`);
    const leaveRequest = response.data;

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leaveRequest.status !== 'approved') {
      return res.status(400).json({ message: 'Leave request not approved yet' });
    }

    // Check if gatepass already exists for this leave
    const existingGatePass = await prisma.gatePass.findFirst({
      where: { leaveId },
    });

    if (existingGatePass) {
      return res.status(409).json({ message: 'Gate pass already issued for this leave request' });
    }

    // Create gatepass
    const gatePass = await prisma.gatePass.create({
      data: {
        leaveId: leaveRequest.id,
        userId: leaveRequest.userId,
        reason: leaveRequest.reason,
        fromDate: leaveRequest.fromDate,
        toDate: leaveRequest.toDate,
        department: leaveRequest.department,
        flowType: leaveRequest.flowType,
        status: 'issued',
        issuedById: hostelAdminId || null,
      },
    });

    // // Notify user
    // await sendGatePassIssuedNotification(leaveRequest.userId, gatePass);

    return res.status(201).json({ message: 'Gate pass issued successfully', gatePass });
  } catch (error) {
    console.error('Error issuing gatepass:', error);
    return res.status(500).json({ message: 'Server error while issuing gate pass' });
  }
};



// View gate passes for logged-in user
export const myGatePasses = async (req, res) => {
  try {
    const passes = await prisma.gatePass.findMany({
      where: {
        userId: req.user.id 
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(passes);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};



export const verifyGatePass = async (req, res) => {
  const { gatePassId} = req.params;
  const { status } = req.body;
  const verifierId = req.user.id;
  console.log(verifierId)
  // console.log(verifierId.id)

  try {
    const gatePass = await prisma.gatePass.findUnique({
      where: { id: gatePassId },
    });

    if (!gatePass) {
      return res.status(404).json({ message: 'Gate pass not found' });
    }

    if (status === 'used') {
      if (gatePass.status !== 'issued') {
        return res.status(400).json({ message: 'Gate pass must be in "issued" state to mark as used' });
      }

      const updated = await prisma.gatePass.update({
        where: { id: gatePassId },
        data: {
          status: 'used',
          gateOutAt: new Date(),
          verifiedOutById: verifierId,
        },
      });

      // notification
      // await sendGatePassUsedNotification(gatePass.userId, gatePassId);
      return res.status(200).json({ message: 'Exit verified successfully', gatePass: updated });
    }

    if (status === 'expired') {
      if (gatePass.status !== 'used') {
        return res.status(400).json({ message: 'Gate pass must be "used" to mark as expired' });
      }

      const updated = await prisma.gatePass.update({
        where: { id: gatePassId },
        data: {
          status: 'expired',
          gateInAt: new Date(),
          verifiedInById: verifierId,
        },
      });

      // notification
      // await sendGatePassExpiredNotification(gatePass.userId, gatePassId);
      return res.status(200).json({ message: 'Re-entry verified and gate pass expired', gatePass: updated });
    }

    return res.status(400).json({ message: 'Invalid status provided' });
  } catch (error) {
    console.error('Gate pass verification failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




