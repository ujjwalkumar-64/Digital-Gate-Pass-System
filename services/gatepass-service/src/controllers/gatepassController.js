import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import axios from 'axios';
import logger from '../utils/logger.js'; // Import the logger utility
import { sendGatePassIssuedNotification, sendGatePassUsedNotification, sendGatePassExpiredNotification } from '../utils/notificationUtils.js'; // Assuming notificationUtils sends notifications

export const issueGatePass = async (req, res) => {
  const hostelAdminId = req.user.id;
  const { leaveId } = req.body;

  logger.info(`Processing gate pass issuance for leave ID: ${leaveId} by hostel admin ID: ${hostelAdminId}`);

  try {
    const response = await axios.get(`http://localhost:3002/api/leave/${leaveId}`);
    const leaveRequest = response.data;

    if (!leaveRequest) {
      logger.warn(`Leave request not found for leave ID: ${leaveId}`);
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leaveRequest.status !== 'approved') {
      logger.warn(`Leave request with ID: ${leaveId} is not approved`);
      return res.status(400).json({ message: 'Leave request not approved yet' });
    }

    // Check if gate pass already exists for this leave
    const existingGatePass = await prisma.gatePass.findFirst({
      where: { leaveId },
    });

    if (existingGatePass) {
      logger.warn(`Gate pass already issued for leave ID: ${leaveId}`);
      return res.status(409).json({ message: 'Gate pass already issued for this leave request' });
    }

    // Create gate pass
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

    logger.info(`Gate pass issued successfully for leave ID: ${leaveId}`);

    // Notify user
    const resp = await axios.get(`http://localhost:3000/api/auth/user?userId=${leaveRequest.userId}`);
    const student = resp.data;

    const { data: admins } = await axios.get(`http://localhost:3000/api/auth/admins?role=security_admin`);
    if (!admins || admins.length === 0) {
      logger.warn('No security admin found to notify');
      return res.status(404).json({ message: 'No admin found to notify' });
    }

    // Notify all matched admins
    for (const security of admins) {
      await sendGatePassIssuedNotification(student, gatePass, security);
    }

    logger.info(`Notifications sent to security admins for gate pass ID: ${gatePass.id}`);
    return res.status(201).json({ message: 'Gate pass issued successfully', gatePass });
  } catch (error) {
    logger.error('Error issuing gate pass:', error);
    return res.status(500).json({ message: 'Server error while issuing gate pass' });
  }
};

export const myGatePasses = async (req, res) => {
  try {
    const passes = await prisma.gatePass.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`Fetched gate passes for user ID: ${req.user.id}`);

    res.json({
      gatepasses: passes,
      total: passes.length,
    });
  } catch (err) {
    logger.error(`Failed to fetch gate passes for user ID: ${req.user.id}`, err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};
export const gatePasses = async (req, res) => {
  try {
    const passes = await prisma.gatePass.findMany({
       
      orderBy: { createdAt: 'desc' },
    });

    logger.info(`Fetched gate passes for user: ${req.user.role}`);

    res.json({
      gatepasses: passes,
      total: passes.length,
    });
  } catch (err) {
    logger.error(`Failed to fetch gate passes for : ${req.user.role}`, err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};


export const verifyGatePass = async (req, res) => {
  const { gatePassId } = req.params;
  const { status } = req.body;
  const verifierId = req.user.id;

  logger.info(`Verifying gate pass ID: ${gatePassId} with status: ${status} by verifier ID: ${verifierId}`);

  try {
    const gatePass = await prisma.gatePass.findUnique({
      where: { id: gatePassId },
    });

    if (!gatePass) {
      logger.warn(`Gate pass not found for ID: ${gatePassId}`);
      return res.status(404).json({ message: 'Gate pass not found' });
    }

    if (status === 'used') {
      if (gatePass.status !== 'issued') {
        logger.warn(`Gate pass ID: ${gatePassId} must be in "issued" state to mark as used`);
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

      const resp = await axios.get(`http://localhost:3000/api/auth/user?userId=${gatePass.userId}`);
      const student = resp.data;
      const { data: admins } = await axios.get(`http://localhost:3000/api/auth/admins?role=security_admin`);
      await sendGatePassUsedNotification(student, gatePassId, admins);

      logger.info(`Gate pass ID: ${gatePassId} marked as used`);
      return res.status(200).json({ message: 'Exit verified successfully', gatePass: updated });
    }

    if (status === 'expired') {
      if (gatePass.status !== 'used') {
        logger.warn(`Gate pass ID: ${gatePassId} must be "used" to mark as expired`);
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

      const resp = await axios.get(`http://localhost:3000/api/auth/user?userId=${gatePass.userId}`);
      const student = resp.data;
      const { data: admins } = await axios.get(`http://localhost:3000/api/auth/admins?role=security_admin`);
      await sendGatePassExpiredNotification(student, gatePassId, admins);

      logger.info(`Gate pass ID: ${gatePassId} marked as expired`);
      return res.status(200).json({ message: 'Re-entry verified and gate pass expired', gatePass: updated });
    }

    logger.warn(`Invalid status provided for gate pass ID: ${gatePassId}`);
    return res.status(400).json({ message: 'Invalid status provided' });
  } catch (error) {
    logger.error('Gate pass verification failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




export const recordExit = async (req, res) => {
  const gatePassId = req.params.id;
  const userId = req.user.id;

  try {
    const updated = await prisma.gatePass.update({
      where: { id: gatePassId },
      data: {
        status: 'used',
        gateOutAt: new Date(),
        verifiedOutById: userId,
      },
    });
    res.json({ message: 'Exit recorded successfully', gatePass: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error recording exit', error: err.message });
  }
};

export const recordEntry = async (req, res) => {
  const gatePassId = req.params.id;
  const userId = req.user.id;

  try {
    const updated = await prisma.gatePass.update({
      where: { id: gatePassId },
      data: {
        status: 'expired',
        gateInAt: new Date(),
        verifiedInById: userId,
      },
    });
    res.json({ message: 'Entry recorded successfully', gatePass: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error recording entry', error: err.message });
  }
};
