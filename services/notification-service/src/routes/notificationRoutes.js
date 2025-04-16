import express from "express"
const router = express.Router();
import { sendNotification,getNotificationsByUser,getNotifications,markAsRead } from '../controllers/notificationController.js';

// Route to send a notification
router.post('/send', sendNotification);
router.get('/:userId', getNotificationsByUser);
router.patch('/read/:id', markAsRead);
router.get('/', getNotifications);


export default router;
