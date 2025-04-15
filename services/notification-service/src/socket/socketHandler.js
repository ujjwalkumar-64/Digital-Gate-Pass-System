import { Server } from 'socket.io';
import { redis, connectToRedis } from '../utils/redisClient.js'; // Corrected import

connectToRedis();

// Initialize the Socket.IO server
const initSocketServer = (server) => {
  const io = new Server(server); // Correct initialization

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When a user joins, map their socket ID to their userId (stored in Redis)
    socket.on('join', (userId) => {
      redis.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    // Listen for disconnects and clean up Redis mappings
    socket.on('disconnect', () => {
      redis.get(socket.id, (err, userId) => {
        if (userId) {
          redis.del(userId);
          console.log(`User ${userId} disconnected and socket ID removed from Redis.`);
        }
      });
    });
  });

  return io;
};

// Emit a notification to a specific user via their socketId
const sendNotificationToUser = (userId, notificationData, io) => {
  redis.get(userId, (err, socketId) => {
    if (socketId) {
      io.to(socketId).emit('notification', notificationData); // Emit message to user
      console.log(`Notification sent to user ${userId}`);
    } else {
      console.log(`User ${userId} not connected.`);
    }
  });
};

export { initSocketServer, sendNotificationToUser };
