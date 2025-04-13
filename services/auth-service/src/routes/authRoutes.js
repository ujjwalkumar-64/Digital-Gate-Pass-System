import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users/:id', authController.getUserById);
router.get('/users/role/:role', authController.getUsersByRole);
router.get('/users/department/:department', authController.getUsersByDepartment);

export default router;
