import { redis, connectToRedis } from '../utils/redisClient.js';
import logger from '../utils/logger.js'; // Import the logger utility

connectToRedis();

const initSocketServer = (io) => {
  io.on('connection', (socket) => {
    logger.info(`✅ A user connected: ${socket.id}`); // Log user connection

    socket.on('join', async (userId) => {
      logger.info(`Join event received from socket ID: ${socket.id} for userId: ${userId}`);
      const key = `socket:${userId}`;
      try {
        await redis.set(key, socket.id, 'EX', 300); // Set Redis key with expiration
        logger.info(`✅ User ${userId} joined with socket ID ${socket.id}`);
      } catch (err) {
        logger.error(`❌ Error setting Redis key for user ${userId}:`, err);
      }
    });

    socket.on('disconnect', async () => {
      try {
        const keys = await redis.keys('*');
        for (const key of keys) {
          const value = await redis.get(key);
          if (value === socket.id) {
            await redis.del(key);
            logger.info(`Redis cleanup: ${key} disconnected`);
          }
        }
      } catch (err) {
        logger.error('❌ Redis cleanup error:', err);
      }
    });
  });
};

const sendNotificationToUser = async (userId, notificationData, io) => {
  try {
    const socketId = await redis.get(`socket:${userId}`);
    logger.info(`🔎 Redis lookup for user ${userId} => ${socketId}`);
    if (socketId) {
      io.to(socketId).emit('notification', notificationData);
      logger.info(`✅ Notification sent to user ${userId}`);
    } else {
      logger.warn(`⚠️ User ${userId} not connected`);
    }
  } catch (err) {
    logger.error('❌ Notification send error:', err);
  }
};

export { initSocketServer, sendNotificationToUser };
