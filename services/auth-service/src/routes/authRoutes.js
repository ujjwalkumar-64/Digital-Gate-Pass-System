import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { registerUser, login ,updateUserApproval} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.patch('/update-approval',updateUserApproval)
// router.get('/users/:id',  getUserById);
// router.get('/users/role/:role',  getUsersByRole);
// router.get('/users/department/:department',  getUsersByDepartment);

export default router;
