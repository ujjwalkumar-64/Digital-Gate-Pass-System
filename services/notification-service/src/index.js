import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import notificationRoutes from './routes/notificationRoutes.js';
import { initSocketServer } from './socket/socketHandler.js';
import connectToDB from './utils/prismaClient.js';
import logger from './utils/logger.js'; // Import the logger utility
import requestLogger from './middleware/requestLogger.js'; // Import the request logger middleware

const app = express();
app.use(cors());
app.use(express.json());

// Apply the request logger middleware globally
app.use(requestLogger);

// Initialize notification routes
logger.info('Initializing notification routes...');
app.use('/api/notifications', notificationRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  transports: ['websocket'],
  pingTimeout: 20000,    // Wait 20s for ping response
  pingInterval: 10000,   // Send ping every 10s
});

// Log that the Socket.IO server is being initialized
logger.info('Initializing Socket.IO server...');
global.io = io; 
initSocketServer(io); // This will now add listeners to the SAME io object

const PORT = process.env.PORT || 5004;

// Connect to the database and start the server
connectToDB().then(() => {
  logger.info('✅ Connected to the database'); // Log successful database connection
  logger.info('✅ Socket.IO server initialized'); // Log server initialization

  server.listen(PORT, () => logger.info(`✅ Notification service running on port ${PORT}`)); // Log server start
}).catch((error) => {
  logger.error('❌ Failed to initialize the server:', error); // Log initialization failure
});