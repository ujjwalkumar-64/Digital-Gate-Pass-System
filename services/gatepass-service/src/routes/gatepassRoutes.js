import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  issueGatePass,
  myGatePasses,
  verifyGatePass
} from '../controllers/gatepassController.js';

const router = express.Router();

router.post('/issue/:leaveId', verifyToken(["hostel_admin"]), issueGatePass);
router.get('/me', verifyToken(["student"]), myGatePasses);
router.patch('/verify/:gatePassId', verifyToken(["security_admin"]), verifyGatePass);

export default router;
