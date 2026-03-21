import { hasPermission } from '../config/permissions.js';

export const requirePermission = (action) => (req, res, next) => {
  const roles = req.user?.roles || [];
  if (hasPermission(roles, action)) return next();
  return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
};
