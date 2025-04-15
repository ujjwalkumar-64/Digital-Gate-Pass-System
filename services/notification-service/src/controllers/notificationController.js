
// export const createNotification = async (req, res) => {
//   const { userId } = req.params;
//   const { message } = req.body;

//   try {
//     const notification = await prisma.notification.create({
//       data: { userId, message },
//     });

//     // get user email and phone from db
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     // Send Email
//     if (user?.email) {
//       await sendEmail(user.email, 'New Notification', message);
//     }

//     // Send SMS if available
//     if (user?.phone) {
//       await sendSMS(user.phone, message);
//     }

//     // Redis pub for websocket
//     await redis.publish('notifications', JSON.stringify({ userId, message }));

//     res.json(notification);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


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
  const { recipientId,email, channel, message, type } = req.body;

 
    const notification = await prisma.notification.create({
      data: {
        recipientId,
        channel,
        message,
        email,
        type,
        status: 'pending',  
        timestamp: new Date(),
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

