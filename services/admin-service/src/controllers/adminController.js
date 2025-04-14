import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
import axios from "axios"
import { getServiceStats } from '../utils/fetchStats.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getServiceStats();
   return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// GET /api/admin/check-approval?email=someone@example.com&role=hostel_admin

export const checkAdminApproval = async (req, res) => {
  const { email, role } = req.query;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required." });
  }

  try {
    const request = await prisma.adminRequest.findFirst({
      where: {
        targetEmail: email,
        role: role,
        status: "approved",
      },
    });

    const isApproved = !!request;

    return res.status(200).json({ isApproved });
  } catch (error) {
    console.error("Error checking approval:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


export const listPendingAdminRequests = async (req, res) => {
  try {
    const requests = await prisma.adminRequest.findMany({
      where: { status: 'pending' },
      include: { requester: true },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching admin requests:', error);
    return res.status(500).json({ message: 'Error fetching admin requests' });
  }
};


export const approveAdminRequest = async (req, res) => {
  const { adminRequestId } = req.params;
  if (!adminRequestId) {
    return res.status(400).json({ message: 'Admin request ID is required.' });
  }

  try {
    // Find the admin request
    const adminRequest = await prisma.adminRequest.findUnique({
      where: { id: adminRequestId },
    });

    if (!adminRequest) {
      return res.status(404).json({ message: 'Admin request not found.' });
    }

    // Make an API call to the auth-service to approve the user
    const response = await axios.patch('http://localhost:3000/api/auth/update-approval', {
      userId: adminRequest.requesterId, 
      isApproved: true,
    });

    if (response.status === 200) {
      // Update the admin request status
      await prisma.adminRequest.update({
        where: { id: adminRequestId },
        data: { status: 'approved' },
      });

      // await axios.post('http://notification-service:3005/api/notify', {
      //   recipients: [adminRequest.requesterId],
      //   type: 'admin_approval',
      //   title: 'Admin Request Approved',
      //   message: `Your request for ${adminRequest.role} access has been approved.`,
      // });

      return res.status(200).json({ message: 'Admin request approved successfully.' });
    }

    return res.status(500).json({ message: 'Failed to approve user in auth-service.' });

  } catch (error) {
    console.error('Error approving admin request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// need to review and change
export const createAdminRequest = async (req, res) => {
  try {
    const { requesterId, targetEmail, role, department, requesterName } = req.body;

    if (!requesterId || !targetEmail || !role) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // 1. Check if the requester already exists in the local User table
    let existingUser = await prisma.user.findUnique({ where: { id: requesterId } });

    if (!existingUser) {
      // 2. Create minimal user (just enough for foreign key)
      existingUser = await prisma.user.create({
        data: {
          id: requesterId,
          name: requesterName
        }
      });
    }

    // 3. Create the admin request
    const newRequest = await prisma.adminRequest.create({
      data: {
        requesterId,
        targetEmail,
        role,
        department: department || null,
      },
    });

    // // Notify Superadmin(s)
    // await axios.post('http://notification-service:3005/api/notify', {
    //   recipients: ['superadmin'],
    //   type: 'admin_approval_request',
    //   title: 'New Admin Request',
    //   message: `${requesterName} has requested ${role} access.`,
    //   metadata: {
    //     requestId: newRequest.id,
    //     requesterId,
    //     role,
    //     department,
    //   },
    // });

    return res.status(201).json({
      message: 'Admin request submitted and notification sent.',
      request: newRequest,
    });

  } catch (error) {
    console.error('Error creating admin request:', error);
    return res.status(500).json({ message: 'Error creating admin request', error: error.message });
  }
};