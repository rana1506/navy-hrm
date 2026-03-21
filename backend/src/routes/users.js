import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('department').populate('division');
  res.json(user);
});

// Basic user search (Admin/CO only) - simplified check
router.get('/', auth, async (req, res) => {
  const roles = req.user.roles || [];
  if (!roles.includes('ADMIN') && !roles.includes('CO')) return res.status(403).json({ message: 'Forbidden' });
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

export default router;
