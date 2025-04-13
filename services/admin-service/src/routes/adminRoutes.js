import express from 'express';
import { getDashboardStats,createAdmin } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyToken(['super-admin']), getDashboardStats);
router.post('/create', verifyToken(['super-admin']), createAdmin);
export default router;
