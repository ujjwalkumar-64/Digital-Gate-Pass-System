import { PrismaClient } from '../generated/prisma/index.js';
import axios from "axios";
import { getServiceStats } from '../utils/fetchStats.js';
import logger from '../utils/logger.js';  

const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getServiceStats();
    logger.info('Dashboard stats fetched successfully');
    return res.json(stats);
  } catch (err) {
    logger.error('Failed to fetch dashboard stats:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const checkAdminApproval = async (req, res) => {
  const { email, role } = req.query;

  if (!email || !role) {
    logger.warn('Email and role are required for admin approval check');
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
    logger.info(`Admin approval check for email: ${email}, role: ${role}, result: ${isApproved}`);
    return res.status(200).json({ isApproved });
  } catch (error) {
    logger.error('Error checking admin approval:', error);
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

    logger.info('Fetched pending admin requests');
    return res.status(200).json({ requests });
  } catch (error) {
    logger.error('Error fetching admin requests:', error);
    return res.status(500).json({ message: 'Error fetching admin requests' });
  }
};

export const approveAdminRequest = async (req, res) => {
  const { adminRequestId,status } = req.params;
  if (!adminRequestId) {
    logger.warn('Admin request ID is required for approval');
    return res.status(400).json({ message: 'Admin request ID is required.' });
  }

  try {
    const adminRequest = await prisma.adminRequest.findUnique({
      where: { id: adminRequestId },
    });

    if (!adminRequest) {
      logger.warn(`Admin request not found for ID: ${adminRequestId}`);
      return res.status(404).json({ message: 'Admin request not found.' });
    }

    

    switch (status) {
      case 'approved':
          const response = await axios.patch('http://localhost:3000/api/auth/update-approval', {
            userId: adminRequest.requesterId,
            isApproved: true,
          });

          if (response.status === 200) {
            await prisma.adminRequest.update({
              where: { id: adminRequestId },
              data: { status: 'approved' },
            });

            const payload = {
              requestId: adminRequestId,
              requesterId: adminRequest.requesterId,
              role: adminRequest.role,
              department:adminRequest.department,
            };

            
            await axios.post('http://localhost:5004/api/notifications/send', {
              type: 'admin_approval_request',
              channel: 'socket',
              title: 'Admin Request Approved',
              recipientId: adminRequestId,
              email:"admin@gmail.com",
              meta:payload,
              message: `Your request for ${adminRequest.role} access has been approved.`,
            });

            logger.info(`Admin request approved successfully for ID: ${adminRequestId}`);
            return res.status(200).json({ message: 'Admin request approved successfully.' });
          }
        break;

      case 'rejected':

        await prisma.adminRequest.update({
          where: { id: adminRequestId },
          data: { status: 'rejected' },
        });
            const payload = {
              requestId: adminRequestId,
              requesterId: adminRequest.requesterId,
              role: adminRequest.role,
              department:adminRequest.department,
            };


        await axios.post('http://localhost:5004/api/notifications/send', {
          type: 'admin_approval_request',
          channel: 'socket',
          title: 'Admin Request Rejected',
          recipientId: adminRequestId,
          email:"admin@gmail.com",
          meta:payload,
          message: `Your request for ${adminRequest.role} access has been rejected.`,
      });      

        logger.info(`Admin request rejected  for ID: ${adminRequestId}`);
        return res.status(200).json({ message: 'Admin request approved successfully.' });
       
        
      default:
        break;
    }

    logger.error(`Failed to approve user in auth-service for request ID: ${adminRequestId}`);
    return res.status(500).json({ message: 'Failed to approve user in auth-service.' });

  } catch (error) {
    logger.error('Error approving admin request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAdminRequest = async (req, res) => {
  try {
    const { requesterId, targetEmail, role, department, requesterName } = req.body;

    if (!requesterId || !targetEmail || !role) {
      logger.warn('Missing required fields for creating admin request');
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    let existingUser = await prisma.user.findUnique({ where: { id: requesterId } });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          id: requesterId,
          name: requesterName,
          role,
        },
      });
      logger.info(`Created new user with ID: ${requesterId}`);
    }

    const newRequest = await prisma.adminRequest.create({
      data: {
        requesterId,
        targetEmail,
        role,
        department: department || null,
      },
    });

    logger.info(`Admin request created successfully for requester ID: ${requesterId}`);
    const payload = {
        requestId: newRequest.id,
        requesterId,
        role,
        department,
      };

   await axios.post('http://localhost:5004/api/notifications/send', {
     type: 'admin_approval_request',
     channel: 'email',
     title: 'New Admin Request',
     recipientId: requesterId ,
     email: "admin@gmail.com",
     meta:payload,
     message: `${requesterName} has requested ${role} access.`,
   });
 
   await axios.post('http://localhost:5004/api/notifications/send', {
     type: 'admin_approval_request',
     channel: 'socket',
     title: 'New Admin Request',
     recipientId: requesterId,
     email:"admin@gmail.com",
     meta:payload,
     message: `${requesterName} has requested ${role} access.`,
   });

    return res.status(201).json({
      message: 'Admin request submitted and notification sent.',
      request: newRequest,
    });

  } catch (error) {
   
    logger.error('Error creating admin request:', error);
    return res.status(500).json({ message: 'Error creating admin request', error: error.message });
  }
};