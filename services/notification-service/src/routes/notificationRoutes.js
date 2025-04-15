// import express from 'express';
// import {
//   createNotification,
//   getMyNotifications,
//   markAsRead,
//   getAllNotifications
// } from '../controllers/notificationController.js';
// import { verifyToken } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/notify/:userId', createNotification); // Called from other services
// router.get('/notify/me', getMyNotifications);
// router.patch('/notify/:id/read', verifyToken(["super-admin","admin"]), markAsRead);
// router.get('/notifications',verifyToken(["super-admin","admin"]), getAllNotifications); // Updated to support filters

// export default router;

// routes/notificationRoutes.js
import express from "express"
const router = express.Router();
import { sendNotification } from '../controllers/notificationController.js';

// Route to send a notification
router.post('/send', sendNotification);

export default router;
