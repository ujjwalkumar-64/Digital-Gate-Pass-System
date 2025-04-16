
import { redis, connectToRedis } from '../utils/redisClient.js';

connectToRedis();

const initSocketServer = (io) => {
  io.on('connection', (socket) => {
    console.log('✅ A user connected:', socket.id);

    socket.on('join', async (userId) => {
      console.log('Join event received from:', socket.id, 'for userId:', userId);
      const key = `socket:${userId}`;
      await redis.set(key, socket.id, 'EX',300); 
      console.log(`✅ User ${userId} joined with socket ID ${socket.id}`);    
    });
    
    socket.on('disconnect', async () => {
      try {
        const keys = await redis.keys('*');
        for (const key of keys) {
          const value = await redis.get(key);
          if (value === socket.id) {
            await redis.del(key);
            console.log(`Redis cleanup: ${key} disconnected`);
          }
        }
      } catch (err) {
        console.error('Redis cleanup error:', err);
      }
    });
  });
};

const sendNotificationToUser = async (userId, notificationData, io) => {
  try {
    const socketId = await redis.get(userId);
    console.log('🔎 Redis lookup for user:', userId, '=>', socketId);
    if (socketId) {
      io.to(socketId).emit('notification', notificationData);
      console.log(`✅ Notification sent to ${userId}`);
    } else {
      console.log(`⚠️ User ${userId} not connected`);
    }
  } catch (err) {
    console.error('Notification send error:', err);
  }
};

export { initSocketServer, sendNotificationToUser };
