import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {getLeaveById, createLeaveRequest, approveLeaveRequest, rejectLeaveRequest,getAllLeaveRequests } from '../controllers/leaveController.js';

const router = express.Router();

router.patch('/approve/:leaveId', verifyToken(['hostel_admin', 'super_admin', 'department_admin', 'academic_admin']), approveLeaveRequest);
router.patch('/reject/:leaveRequestId', verifyToken(['hostel_admin', 'super_admin', 'department_admin', 'academic_admin']), rejectLeaveRequest);
router.get('/getAllLeaveRequests', verifyToken(["super_admin","department_admin","academic_admin","hostel_admin"]), getAllLeaveRequests);
router.get('/:leaveId',getLeaveById);
router.post('/', verifyToken(["student"]),createLeaveRequest);

export default router;