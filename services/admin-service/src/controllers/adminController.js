import { getServiceStats } from '../utils/fetchStats.js';
import axios from 'axios';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getServiceStats();
   return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};



export const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, role, department, roomNumber } = req.body;

    // Validate allowed roles
    const allowedRoles = ['leave-admin', 'gatepass-admin', 'notification-admin', 'security'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid admin role' });
    }

    // Call auth-service to register the new admin
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/register`, {
      name,
      email,
      phone,
      password,
      role,
      department,
      roomNumber: null, // Admins don't have rooms
    });

    res.status(201).json({ message: 'Admin registered successfully', data: response.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to register admin', error: err.response?.data || err.message });
  }
};
