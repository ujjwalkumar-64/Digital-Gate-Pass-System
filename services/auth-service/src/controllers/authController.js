import { PrismaClient } from '../generated/prisma/index.js';



const prisma = new PrismaClient();

import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';

const allowedDepartments = [
  'computer science and engineering',
  'chemical engineering',
  'petroleum engineering',
  'mathematical and computing department'
];

export const registerUser = async (req, res) => {
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

    if (role === 'student') {
      if (!rollNumber || !roomNumber || !department) {
        return res.status(400).json({ message: 'Student must provide rollNumber, roomNumber, and department.' });
      }
      if (!allowedDepartments.includes(department)) {
        return res.status(400).json({ message: 'Invalid department selected.' });
      }
    }

    if (role === 'department_admin' && !department) {
      return res.status(400).json({ message: 'Department admin must have department.' });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isApproved = (role === 'student' || role === 'super_admin') ? true : false;
    console.log("Create user payload: ", {
      name,
      email,
      password,
      role,
      phone,
      roomNumber,
      rollNumber,
      department,
      isApproved
    });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        rollNumber: role === 'student' ? roomNumber : null,
        roomNumber: role === 'student' ? rollNumber : null,
        department: (role === 'student' || role === 'department_admin') ? department : null,
        isApproved
      },
    });
    const token = signToken({ id: newUser.id, role: newUser.role });

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        isApproved: newUser.isApproved
      },
      token
    });

  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};


const isAdminApproved = async (email, role) => {
  try {
    const { data } = await axios.get(`http://admin-service/api/admin/check-approval?email=${email}&role=${role}`);
    return data.isApproved;
  } catch (err) {
    console.error("Error checking admin approval:", err);
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
        role: user.role,
        department: user.department ?? null,
      }
    );

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

