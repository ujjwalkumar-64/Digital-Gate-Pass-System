import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

import { redis } from '../utils/redisClient.js';
import { sendEmail } from '../services/emailService.js';
import logger from '../utils/logger.js'; 


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
  const { recipientId, email, channel, message, type, meta, title } = req.body;
  const defaultTitle = {
    leave_request: 'Leave Request Submitted',
    gatepass: 'Gate Pass Update',
    approval: 'Request Approved',
    rejection: 'Request Rejected',
    admin_approval_request: 'Admin Approval Request'
  };

  let notification;

  try {
    notification = await prisma.notification.create({
      data: {
        recipientId,
        channel,
        email,
        message,
        title: title || defaultTitle[type] || 'Notification',
        type,
        meta: meta || null,
        status: 'pending',
      },
    });

    if (channel === 'email') {
      await sendEmail(email, message);
    } else if (channel === 'socket') {
      const socketId = await redis.get(`socket:${recipientId}`);
      if (socketId && global.io) {
        global.io.to(socketId).emit('notification', {
          ...notification, // Send full notification object
        });
      }
    }

    await prisma.notification.update({
      where: { id: notification.id },
      data: { status: 'sent' },
    });

    return res.status(200).json({ message: 'Notification sent successfully' });

  } catch (error) {
    logger.error('❌ Notification sending failed:', error);
    if (notification?.id) {
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'failed' },
      });
    }
    return res.status(500).json({ message: 'Failed to send notification' });
  }
};

export const getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { recipientId: userId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({
        where: { recipientId: userId, read: false },
      }),
    ]);

    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    logger.error(`❌ Error fetching notifications for user ${userId}:`, error);
    res.status(500).json({ message: 'Failed to load notifications' });
  }
};

export const getNotifications = async (req, res) => {
  const { type, skip = 0, limit = 10 } = req.query;
  const userId= req.user.id
  try {
    const filters = { recipientId: userId };
    if (type) filters.type = type;

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit),
      }),
      prisma.notification.count({
        where: { recipientId: userId, read: false },
      }),
    ]);

    return res.status(200).json({ notifications, unreadCount });
  } catch (err) {
    logger.error(`❌ Failed to fetch notifications for user ${userId}:`, err);
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

 
export const markAllAsRead = async (req, res) => {
  const { userId } = req.body;
  try {
    await prisma.notification.updateMany({
      where: { recipientId: userId, read: false },
      data: { read: true },
    });

    logger.info(`✅ All notifications marked as read for user ${userId}`);
    return res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    logger.error(`❌ Failed to mark all notifications as read for user ${userId}`, err);
    res.status(500).json({ message: 'Failed to mark all as read' });
  }
};
