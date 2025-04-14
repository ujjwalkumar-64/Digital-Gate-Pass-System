import express from 'express';
import { getPendingAdmins, approveAdmin ,getDashboardStats} from '../controllers/admin.controller.js';
import { authenticateToken, authorizeSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticateToken,authorizeSuperAdmin, getDashboardStats);
router.get('/pending-admins', authenticateToken, authorizeSuperAdmin, getPendingAdmins);
router.patch('/approve/:id', authenticateToken, authorizeSuperAdmin, approveAdmin);


export default router;



