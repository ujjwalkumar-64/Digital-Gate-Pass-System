import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  issueGatePass,
  myGatePasses,
  approveGatePass
} from '../controllers/gatepassController.js';

const router = express.Router();

router.post('/issue/:leaveId', verifyToken(["hostel"]), issueGatePass);
router.get('/me', verifyToken(["student"]), myGatePasses);
router.patch('/scan/:id', verifyToken(["security"]), approveGatePass);

export default router;
