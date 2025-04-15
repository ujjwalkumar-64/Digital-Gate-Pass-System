import express from "express";
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import notificationRoutes from './routes/notificationRoutes.js';
import { initSocketServer } from './socket/socketHandler.js';
import connectToDB from './utils/prismaClient.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

initSocketServer(io);

const PORT = process.env.PORT || 5004;
connectToDB().then(() => {
  server.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
});