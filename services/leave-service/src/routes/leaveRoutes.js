import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createLeaveRequest, approveLeaveRequest, rejectLeaveRequest, myLeaves } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', verifyToken(["student"]),createLeaveRequest);
router.post('/approve/:leaveId', verifyToken(['hostel', 'super-admin', 'department', 'academic']), approveLeaveRequest);
router.patch('/:id/reject', verifyToken(['hostel', 'super-admin', 'department', 'academic']), rejectLeaveRequest);
router.get('/me', verifyToken("student"), myLeaves);

export default router;
