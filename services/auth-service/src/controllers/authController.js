import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import axios from "axios";
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';
import logger from '../utils/logger.js'; // Import logger
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  const allowedDepartments = ['CSE', 'CHEMICAL', 'PETROLEUM', 'MNC'];

  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      roomNumber,
      rollNumber,
      department,
    } = req.body;

    if (!name || !email || !password || !role || !phone) {
      logger.warn('Missing required fields during registration');
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (!['student', 'department_admin', 'academic_admin', 'hostel_admin', 'security_admin', 'super_admin'].includes(role)) {
      logger.warn('Invalid role provided during registration');
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const normalizedDepartment = department?.toUpperCase();

    if (role === 'student') {
      if (!rollNumber || !roomNumber || !department) {
        logger.warn('Student registration missing rollNumber, roomNumber, or department');
        return res.status(400).json({ message: 'Student must provide rollNumber, roomNumber, and department.' });
      }
      if (!allowedDepartments.includes(normalizedDepartment)) {
        logger.warn('Invalid department selected for student registration');
        return res.status(400).json({ message: 'Invalid department selected.' });
      }
    }

    if (role === 'department_admin') {
      if (!department) {
        logger.warn('Department admin registration missing department');
        return res.status(400).json({ message: 'Department admin must have department.' });
      }
      if (!allowedDepartments.includes(normalizedDepartment)) {
        logger.warn('Invalid department selected for department admin registration');
        return res.status(400).json({ message: 'Invalid department selected.' });
      }
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      logger.warn(`User already exists with email: ${email}`);
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isApproved = (role === 'student' || role === 'super_admin');

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        rollNumber: role === 'student' ? rollNumber : null,
        roomNumber: role === 'student' ? roomNumber : null,
        department: (role === 'student' || role === 'department_admin') ? normalizedDepartment : null,
        isApproved
      },
    });

    logger.info(`User registered successfully with ID: ${newUser.id}`);

    if (['department_admin', 'academic_admin', 'hostel_admin', 'security_admin'].includes(role)) {
      try {
        await axios.post('http://localhost:5005/api/admin/admin-request', {
          requesterId: newUser.id,
          targetEmail: newUser.email,
          role,
          department: role === 'department_admin' ? normalizedDepartment : null,
          requesterName: newUser.name,
        });

        logger.info(`Admin request created for user ID: ${newUser.id}`);

        await axios.post('http://localhost:5004/api/notifications/send', {
          type: 'account-approval',
          channel: 'socket',
          recipientId: "9817aedb-a022-4226-a845-febfa82b08ac",
          email: "admin@gmail.com",
          message: `Account approval request for ${role} by ${newUser.name}`,
        });

        logger.info(`Notification sent for admin request of user ID: ${newUser.id}`);
      } catch (notifyError) {
        logger.error('Admin request creation failed:', notifyError);

        // Rollback user creation
        await prisma.user.delete({ where: { id: newUser.id } });
        logger.warn(`User creation rolled back for ID: ${newUser.id}`);

        return res.status(500).json({ message: 'Admin request failed, registration rolled back.' });
      }
    }

    const token = signToken({
      id: newUser.id,
      role: newUser.role,
      department: newUser.department,
      isApproved: newUser.isApproved,
      phone: newUser.phone,
      email: newUser.email,
    });
    res.setHeader('Authorization', `Bearer ${token}`);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department ?? null,
        rollNumber: role === 'student' ? rollNumber : null,
        roomNumber: role === 'student' ? roomNumber : null,
        phone,
        isApproved: newUser.isApproved
      },
      token
    });

  } catch (error) {
    logger.error('Error in registration:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Check if admin is approved

export const isAdminApproved = async (email, role) => {
  try {
    const { data } = await axios.get(`http://localhost:5005/api/admin/check-approval`, {
      params: { email, role }
    });
    logger.info(`Admin approval check for email: ${email}, role: ${role}`);
    return data.isApproved;
  } catch (error) {
    logger.error("Admin approval check failed:", error);
    return false;
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email, role },
    });

    if (!user) {
      logger.warn(`Login failed: User not found or role mismatch. Email: ${email}, Role: ${role}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for email: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If admin role (excluding student and super_admin), check approval
    const isAdmin = user.role !== "student" && user.role !== "super_admin";
    if (isAdmin) {
      const approved = await isAdminApproved(user.email, user.role);
      if (!approved) {
        logger.warn(`Admin login denied: Approval pending for email: ${email}`);
        return res.status(403).json({
          message: "Your admin request is still pending approval by the super admin.",
        });
      }
    }

    // Sign JWT token
    const token = signToken({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      department: user.department ?? null,
      isApproved: user.isApproved,
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    logger.info(`Login successful for user ID: ${user.id}`);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        rollNumber: user.role==="student"?user.rollNumber:null,
        department: user.department,
        roomNumber: user.role==="student"?user.roomNumber:null,
      },
    });
  } catch (err) {
    logger.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserApproval = async (req, res) => {
  const { userId, isApproved } = req.body;

  if (!userId || typeof userId !== 'string') {
    logger.warn('Invalid or missing userId for approval update');
    return res.status(400).json({ message: 'Invalid or missing userId' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isApproved },
    });

    logger.info(`User approval status updated for user ID: ${userId}`);
    return res.status(200).json({ message: 'User approval status updated successfully', updatedUser });
  } catch (error) {
    logger.error('Error updating user approval status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdminsByRole = async (req, res) => {
  try {
    const { role, department } = req.query;

    if (!role) {
      logger.warn('Role is required to fetch admins');
      return res.status(400).json({ message: 'Role is required' });
    }

    const normalizedDepartment = department?.toUpperCase();

    const whereClause = {
      role,
      isApproved: true,
    };

    if (department) {
      whereClause.department = normalizedDepartment;
    }

    const admins = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        department: true,
      },
    });

    logger.info(`Fetched admins for role: ${role}${department ? `, department: ${normalizedDepartment}` : ''}`);
    return res.json(admins);
  } catch (error) {
    logger.error('Error fetching admins by role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    logger.warn('Access denied: No token provided');
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info(`Token verified successfully for user ID: ${decoded.id}, role: ${decoded.role}`);
    
    return res.status(200).json({ user: decoded }); // ✅ directly send decoded
  } catch (err) {
    logger.error('Invalid token:', err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      logger.warn('UserId is required to fetch user details');
      return res.status(400).json({ message: 'UserId is required' });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isApproved: true,
      },
    });

    if (!user) {
      logger.warn(`User not found or not approved for userId: ${userId}`);
      return res.status(404).json({ message: 'User not found or not approved' });
    }

    logger.info(`Fetched user details for userId: ${userId}`);
    res.status(200).json(user);
  } catch (err) {
    logger.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
