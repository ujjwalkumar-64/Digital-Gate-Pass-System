import { getServiceStats } from '../utils/fetchStats.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getServiceStats();
   return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};



export const getPendingAdmins = async (req, res) => {
  try {
    const pendingAdmins = await prisma.user.findMany({
      where: {
        isApproved: false,
        OR: [
          { role: 'department_admin' },
          { role: 'academic_admin' },
          { role: 'hostel_admin' },
          { role: 'security_admin' }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        createdAt: true
      }
    });
    res.status(200).json({ pendingAdmins });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending admins', error: err.message });
  }
};

export const approveAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isApproved: true }
    });
    res.status(200).json({ message: `Admin ${user.name} approved successfully`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error approving admin', error: err.message });
  }
};
