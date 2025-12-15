import express from "express"
const router = express.Router();
import { sendNotification,getNotificationsByUser,getNotifications,markAsRead,markAllAsRead } from '../controllers/notificationController.js';
import { authenticateToken } from "../middleware/auth.js";
// Route to send a notification
router.post('/send', sendNotification);
router.get('/:userId', getNotificationsByUser);
router.patch('/read-all', markAllAsRead);
router.patch('/read/:id', markAsRead);
router.get('/',authenticateToken, getNotifications);

export default router;
