import express from 'express'
import { registerUser, login ,updateUserApproval,getAdminsByRole,getUserById} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.patch('/update-approval',updateUserApproval)
router.get('/admins', getAdminsByRole);
router.get('/user',  getUserById);
// router.get('/users/department/:department',  getUsersByDepartment);

export default router;
