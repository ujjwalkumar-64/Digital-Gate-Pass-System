import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt.js';



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, department, room_number } = req.body;

    if (!department || !phone) {
      return res.status(400).json({ message: 'Department and phone number are required' });
    }

    if (role === 'student' && !room_number) {
      return res.status(400).json({ message: 'Room number required for students' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        department,
        room_number: role === 'student' ? room_number : null,
      },
    });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user.id, role: user.role, department:user.department });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
