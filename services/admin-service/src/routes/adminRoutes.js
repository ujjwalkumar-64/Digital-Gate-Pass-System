import express from 'express';
import { createAdminRequest,listPendingAdminRequests, approveAdminRequest ,getDashboardStats,checkAdminApproval} from '../controllers/adminController.js';
import { authenticateToken, authorizeSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticateToken,authorizeSuperAdmin, getDashboardStats);
router.put('/admin-request/:adminRequestId',authenticateToken,authorizeSuperAdmin, approveAdminRequest);
router.get('/admin-requests/pending',authenticateToken,authorizeSuperAdmin, listPendingAdminRequests);
router.post('/admin-request', createAdminRequest);

router.get("/check-approval", checkAdminApproval);

export default router;



