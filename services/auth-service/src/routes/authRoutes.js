import express from 'express';
import { registerUser, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

// router.get('/users/:id',  getUserById);
// router.get('/users/role/:role',  getUsersByRole);
// router.get('/users/department/:department',  getUsersByDepartment);

export default router;
