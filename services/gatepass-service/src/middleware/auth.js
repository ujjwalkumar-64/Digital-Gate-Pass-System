import jwt from 'jsonwebtoken';

export const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify with secret key
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }
      req.user = decoded; // Attach decoded user info to the request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};
