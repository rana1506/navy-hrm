import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded; // { id, roles, name }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
