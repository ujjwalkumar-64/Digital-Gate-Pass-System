import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  issueGatePass,
  myGatePasses,
  verifyGatePass,
  recordEntry,
  recordExit,
  gatePasses,
} from '../controllers/gatepassController.js';

const router = express.Router();

router.post('/issue', verifyToken(["hostel_admin"]), issueGatePass);
router.get('/me', verifyToken(["student"]), myGatePasses);
router.patch('/verify/:gatePassId', verifyToken(["security_admin"]), verifyGatePass);
router.patch('/:id/exit', verifyToken(["security_admin"]), recordExit);
router.patch('/:id/entry', verifyToken(["security_admin"]), recordEntry);
router.get('/', verifyToken(["hostel_admin"]), gatePasses);

export default router;
