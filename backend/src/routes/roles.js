import express from 'express';
import Role from '../models/Role.js';
import { auth } from '../middleware/auth.js';
import { hasPermission } from '../config/permissions.js';

const router = express.Router();

// Admin/CO full access can add roles dynamically
router.post('/', auth, async (req, res) => {
  if (!hasPermission(req.user.roles, 'FULL_ACCESS')) return res.status(403).json({ message: 'Forbidden' });
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Missing name' });
  const role = await Role.create({ name });
  res.json(role);
});

router.get('/', auth, async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

export default router;
