import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';  

export const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  
    if (!token) {
      logger.warn('Access denied: No token provided'); 
      return res.status(401).json({ message: "Access Denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      if (roles.length && !roles.includes(decoded.role)) {
        logger.warn(`Forbidden: User role '${decoded.role}' does not have sufficient permissions`); // Log insufficient role
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }
      req.user = decoded;  
      logger.info(`Token verified successfully for user ID: ${decoded.id}, role: ${decoded.role}`); // Log successful verification
      next();
    } catch (err) {
      logger.error('Invalid token:', err);  
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};
