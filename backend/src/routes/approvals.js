import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';

const router = express.Router();

// Officers pending -> XO approves and assigns roles
router.get('/officers', auth, requirePermission('APPROVE_OFFICER'), async (req, res) => {
  const users = await User.find({ isOfficer: true, status: 'pending', pendingApprovalBy: 'XO' });
  res.json(users);
});

router.post('/officers/:id/approve', auth, requirePermission('APPROVE_OFFICER'), async (req, res) => {
  const { roles = [] } = req.body; // e.g., ['GO','EO']
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.roles = Array.from(new Set(roles));
  user.status = 'active';
  user.pendingApprovalBy = null;
  await user.save();
  res.json({ message: 'Officer approved and roles assigned', user });
});

// Sailors pending -> RO approves (role SAILOR)
router.get('/sailors', auth, requirePermission('APPROVE_SAILOR'), async (req, res) => {
  const users = await User.find({ isSailor: true, status: 'pending', pendingApprovalBy: 'RO' });
  res.json(users);
});

router.post('/sailors/:id/approve', auth, requirePermission('APPROVE_SAILOR'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.roles = ['SAILOR'];
  user.status = 'active';
  user.pendingApprovalBy = null;
  await user.save();
  res.json({ message: 'Sailor approved', user });
});

export default router;
