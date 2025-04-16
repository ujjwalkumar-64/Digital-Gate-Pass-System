
// // Get my notifications
// export const getMyNotifications = async (req, res) => {
//   try {
//     const notes = await prisma.notification.findMany({
//       where: { userId: req.user.id },
//       orderBy: { createdAt: 'desc' },
//     });
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Mark notification as read
// export const markAsRead = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const note = await prisma.notification.update({
//       where: { id },
//       data: { read: true },
//     });
//     res.json(note);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

 

// export const getAllNotifications = async (req, res) => {
//   try {
//     const { recipient, channel, status, from, to } = req.query;

//     const filters = {};

//     if (recipient) {
//       filters.recipientId = recipient; // Could match user ID or email if extended
//     }

//     if (channel) {
//       filters.channel = channel;
//     }

//     if (status) {
//       filters.status = status;
//     }

//     if (from || to) {
//       filters.timestamp = {};
//       if (from) filters.timestamp.gte = new Date(from);
//       if (to) filters.timestamp.lte = new Date(to);
//     }

//     const notifications = await prisma.notification.findMany({
//       where: filters,
//       orderBy: { timestamp: 'desc' }
//     });

//     res.json(notifications);
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     res.status(500).json({ msg: 'Error retrieving notifications' });
//   }
// };


// export const getNotifications = async (filters) => {
//   const {
//     userId,
//     type,
//     from,
//     to,
//     search,
//     page = 1,
//     limit = 10
//   } = filters;

//   const where = {};

//   if (userId) where.recipientId = userId;
//   if (type) where.type = type;
//   if (search) where.message = { contains: search, mode: 'insensitive' };
//   if (from || to) {
//     where.createdAt = {};
//     if (from) where.createdAt.gte = new Date(from);
//     if (to) where.createdAt.lte = new Date(to);
//   }

//   const skip = (page - 1) * limit;

//   const [notifications, count] = await Promise.all([
//     prisma.notification.findMany({
//       where,
//       orderBy: { createdAt: 'desc' },
//       skip: Number(skip),
//       take: Number(limit),
//     }),
//     prisma.notification.count({ where })
//   ]);

//   return {
//     data: notifications,
//     page: Number(page),
//     totalPages: Math.ceil(count / limit),
//     totalItems: count
//   };
// };


import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

import  { redis } from '../utils/redisClient.js';
import  { sendEmail } from '../services/emailService.js';

export const sendNotification = async (req, res) => {
  const { recipientId,email, channel, message, type,meta } = req.body;

 
    const notification = await prisma.notification.create({
      data: {
        recipientId,
        channel,
        message,
        email,
        type,
        meta: meta || null,
        status: 'pending',  
        
      },
    });

    try {
      
      if (channel === 'email') {
        await sendEmail(email, message);
      } else if (channel === 'socket') {
        const socketId = await redis.get(`socket:${recipientId}`);
        if (socketId && global.io) {
          global.io.to(socketId).emit('notification', { message, type });
        }
      }

      
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'sent' },
      });

      return res.status(200).json({ message: 'Notification sent successfully' });

    } catch (error) {
      console.error('Notification sending failed:', error);
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'failed' },
      });

      return res.status(500).json({ message: 'Failed to send notification' });
    }
};

export const getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to load notifications' });
  }
};

// controllers/getNotifications.js
export const getNotifications = async (req, res) => {
  const { userId, type, skip = 0, limit = 10 } = req.query;

  try {
    const filters = { recipientId: userId };
    if (type) filters.type = type;

    const notifications = await prisma.notification.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    return res.status(200).json(notifications);
  } catch (err) {
    console.error('Failed to fetch notifications', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    return res.status(200).json(updated);
  } catch (err) {
    console.error('Mark as read failed', err);
    res.status(500).json({ message: 'Failed to mark as read' });
  }
};
