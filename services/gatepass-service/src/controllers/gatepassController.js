import { PrismaClient } from '@prisma/client';
import { sendGatePassNotification,sendGatePassUsedNotification } from '../utils/notificationUtils'; // Assuming notificationUtils sends notifications

const prisma = new PrismaClient();

export const issueGatePass = async (req, res) => {
  const { leaveId } = req.body;

  try {
    // Find the leave request by ID
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: leaveId },
      include: { user: true },
    });

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Check if the leave request has been approved and if it's in the 'done' stage
    if (leaveRequest.status !== 'approved' || leaveRequest.currentStage !== 'done') {
      return res.status(400).json({ message: 'Leave request is not approved yet' });
    }

    // Create a gate pass for the leave request
    const gatePass = await prisma.gatePass.create({
      data: {
        leaveId,
        validUntil: leaveRequest.toDate,
        status: 'active',
        workflowType: leaveRequest.workflowType,
      },
    });

    // Send notification about the gate pass creation
    await sendGatePassNotification(leaveRequest.userId, gatePass);

    return res.status(201).json(gatePass);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// View gate passes for logged-in user
export const myGatePasses = async (req, res) => {
  try {
    const passes = await prisma.gatePass.findMany({
      where: {
        leave: { userId: req.user.id }
      },
      orderBy: { issuedAt: 'desc' }
    });

    res.json(passes);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

// // Scan gate pass for OUT/IN logging
// export const scanGatePass = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const gatePass = await prisma.gatePass.findUnique({ where: { id } });
//     if (!gatePass) return res.status(404).json({ message: 'Gate pass not found' });

//     const now = new Date();
//     const update = {};

//     if (!gatePass.gateOutAt) {
//       update.gateOutAt = now;
//     } else if (!gatePass.gateInAt) {
//       update.gateInAt = now;
//       update.status = 'used';
//     } else {
//       return res.status(400).json({ message: 'Already used gate pass' });
//     }

//     const updated = await prisma.gatePass.update({ where: { id }, data: update });
//     res.json({ message: 'Gate scanned successfully', updated });
//   } catch (err) {
//     res.status(500).json({ message: 'Scan failed', error: err.message });
//   }
// };

export const approveGatePass = async (req, res) => {
  const { gatePassId, status } = req.body;

  try {
    // Find the gate pass by ID
    const gatePass = await prisma.gatePass.findUnique({
      where: { id: gatePassId },
    });

    if (!gatePass) {
      return res.status(404).json({ message: 'Gate pass not found' });
    }

    // Validate the gate pass status
    if (status === 'used') {
      // Update the gatepass as used and set gateOutAt time
      await prisma.gatePass.update({
        where: { id: gatePassId },
        data: {
          status: 'used',
          gateOutAt: new Date(),
        },
      });

      // Send notification about gatepass usage
      await sendGatePassUsedNotification(gatePass.leave.userId);
    } else if (status === 'expired') {
      // Expire the gate pass
      await prisma.gatePass.update({
        where: { id: gatePassId },
        data: {
          status: 'expired',
        },
      });
    }

    return res.status(200).json({ message: 'Gate pass status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};