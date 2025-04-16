import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

import { redis } from '../utils/redisClient.js';
import { sendEmail } from '../services/emailService.js';
import logger from '../utils/logger.js'; // Import the logger utility

// // Get my notifications
// export const getMyNotifications = async (req, res) => {
//   try {
//     const notes = await prisma.notification.findMany({
//       where: { userId: req.user.id },
//       orderBy: { createdAt: 'desc' },
//     });
//     logger.info(`✅ Notifications fetched successfully for user ID: ${req.user.id}`); // Log success
//     res.json(notes);
//   } catch (err) {
//     logger.error(`❌ Error fetching notifications for user ID: ${req.user.id}`, err); // Log error
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
//     logger.info(`✅ Notification marked as read for ID: ${id}`); // Log success
//     res.json(note);
//   } catch (err) {
//     logger.error(`❌ Mark as read failed for ID: ${id}`, err); // Log error
//     res.status(500).json({ error: err.message });
//   }
// };

export const sendNotification = async (req, res) => {
  const { recipientId, email, channel, message, type, meta } = req.body;

  try {
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

    if (channel === 'email') {
      await sendEmail(email, message);
      logger.info(`✅ Email notification sent to ${email}`); // Log email success
    } else if (channel === 'socket') {
      const socketId = await redis.get(`socket:${recipientId}`);
      if (socketId && global.io) {
        global.io.to(socketId).emit('notification', { message, type });
        logger.info(`✅ Socket notification sent to user ${recipientId} with socket ID ${socketId}`); // Log socket success
      } else {
        logger.warn(`⚠️ User ${recipientId} is not connected via socket`); // Log warning
      }
    }

    await prisma.notification.update({
      where: { id: notification.id },
      data: { status: 'sent' },
    });

    logger.info(`✅ Notification sent successfully for user ${recipientId}`); // Log success
    return res.status(200).json({ message: 'Notification sent successfully' });

  } catch (error) {
    logger.error('❌ Notification sending failed:', error); // Log error
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

    logger.info(`✅ Notifications fetched successfully for user ${userId}`); // Log success
    res.status(200).json({ notifications });
  } catch (error) {
    logger.error(`❌ Error fetching notifications for user ${userId}:`, error); // Log error
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

    logger.info(`✅ Notifications fetched successfully for user ${userId}`); // Log success
    return res.status(200).json(notifications);
  } catch (err) {
    logger.error(`❌ Failed to fetch notifications for user ${userId}:`, err); // Log error
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

    logger.info(`✅ Notification marked as read for ID: ${id}`); // Log success
    return res.status(200).json(updated);
  } catch (err) {
    logger.error(`❌ Mark as read failed for ID: ${id}`, err); // Log error
    res.status(500).json({ message: 'Failed to mark as read' });
  }
};
