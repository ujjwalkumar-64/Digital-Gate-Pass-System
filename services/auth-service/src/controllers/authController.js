import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

import axios from "axios"
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';



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
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (!['student', 'department_admin', 'academic_admin', 'hostel_admin', 'security_admin', 'super_admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const normalizedDepartment = department?.toUpperCase();

    if (role === 'student') {
      if (!rollNumber || !roomNumber || !department) {
        return res.status(400).json({ message: 'Student must provide rollNumber, roomNumber, and department.' });
      }
      if (!allowedDepartments.includes(normalizedDepartment)) {
        return res.status(400).json({ message: 'Invalid department selected.' });
      }
    }

    if (role === 'department_admin') {
      if (!department) {
        return res.status(400).json({ message: 'Department admin must have department.' });
      }
      if (!allowedDepartments.includes(normalizedDepartment)) {
        return res.status(400).json({ message: 'Invalid department selected.' });
      }
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
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

    if (['department_admin', 'academic_admin', 'hostel_admin', 'security_admin'].includes(role)) {
      try {
        await axios.post('http://localhost:5005/api/admin/admin-request', {
          requesterId: newUser.id,
          targetEmail: newUser.email,
          role,
          department: role=== 'department_admin' ? normalizedDepartment: null,
          requesterName: newUser.name,
        })
      } catch (notifyError) {
        console.error('Admin request creation failed:', notifyError);

        // rollback user creation
        await prisma.user.delete({ where: { id: newUser.id } });

        return res.status(500).json({ message: 'Admin request failed, registration rolled back.' });
      }
    }
     

 

    const token = signToken(
      { 
        id: newUser.id, 
        role: newUser.role , 
        department:newUser.department,
        isApproved:newUser.isApproved,
        phone:newUser.phone,
        email:newUser.email,

      
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
        isApproved: newUser.isApproved
      },
      token
    });

  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};


// need to change utl
const isAdminApproved = async (email, role) => {
  try {
    const { data } = await axios.get(`http://localhost:5005/api/admin/check-approval`, {
      params: { email, role }
    });
    return data.isApproved;
  } catch (error) {
    console.error("Admin approval check failed:", error);
    return false;
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check admin approval if role is admin
    const isAdmin =
      user.role !== "student" && user.role !== "super_admin";

      if (isAdmin) {
        const approved = await isAdminApproved(user.email, user.role);
        if (!approved) {
          return res.status(403).json({
            message: "Your admin request is still pending approval by the super admin.",
          });
        }
      }
      

    const token = signToken(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone:user.phone,
        department: user.department ?? null,
        isApproved: user.isApproved
      }
    );
    
    // Set token in the response header
    res.setHeader('Authorization', `Bearer ${token}`);


    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        department: user.department,
        roomNumber: user.roomNumber,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserApproval = async (req, res) => {
  const { userId, isApproved } = req.body;
  
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing userId' });
  }
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isApproved },
    });

    return res.status(200).json({ message: 'User approval status updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user approval status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdminsByRole = async (req, res) => {
  try {
    const { role, department } = req.query;

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const whereClause = {
      role,
      isApproved: true
    };

    if (department) {
      whereClause.department = department;
    }

    const admins = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        department: true
      }
    });

    return res.json(admins);
  } catch (error) {
    console.error('Get Admins Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const whereClause = {
      id:userId,
      isApproved: true
    };


    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
         
      }
    });

    return res.json(users);
  } catch (error) {
    console.error('Get Admins Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};