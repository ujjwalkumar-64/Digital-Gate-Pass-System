import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';  

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    logger.warn('Access denied: No token provided');  
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info(`Token verified successfully for user ID: ${decoded.id}, role: ${decoded.role}`);  
    next();
  } catch (err) {
    logger.error('Invalid token:', err.message);  
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorizeSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    logger.warn(`Unauthorized access attempt by user ID: ${req.user.id}, role: ${req.user.role}`);  
    return res.status(403).json({ message: 'Only super admin can perform this action' });
  }
  logger.info(`Super admin access granted for user ID: ${req.user.id}`);  
  next();
};
