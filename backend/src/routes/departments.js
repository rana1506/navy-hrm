import express from 'express';
import Department from '../models/Department.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const deps = await Department.find();
  res.json(deps);
});

// RO assigns sailor to department
router.post('/assign', auth, requirePermission('ASSIGN_DEPARTMENT'), async (req, res) => {
  const { userId, departmentId } = req.body;
  const user = await User.findById(userId);
  const dep = await Department.findById(departmentId);
  if (!user || !dep) return res.status(404).json({ message: 'User or Department not found' });
  user.department = dep._id;
  await user.save();
  res.json({ message: 'Assigned department', user });
});

export default router;
