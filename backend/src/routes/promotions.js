import express from 'express';
import Promotion from '../models/Promotion.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// DO proposes promotion for a sailor in own division (simplified)
router.post('/', auth, async (req, res) => {
  const roles = req.user.roles || [];
  if (!roles.includes('DO') && !roles.includes('ADMIN') && !roles.includes('CO')) return res.status(403).json({ message: 'Forbidden' });
  const { sailorId, proposedRank, notes } = req.body;
  const sailor = await User.findById(sailorId);
  if (!sailor) return res.status(404).json({ message: 'Sailor not found' });
  const doc = await Promotion.create({ sailor: sailor._id, proposedBy: req.user.id, proposedRank, notes });
  res.json(doc);
});

router.get('/mine', auth, async (req, res) => {
  const roles = req.user.roles || [];
  if (roles.includes('DO') || roles.includes('ADMIN') || roles.includes('CO')) {
    const list = await Promotion.find({ proposedBy: req.user.id }).populate('sailor','name rank');
    return res.json(list);
  }
  const list = await Promotion.find({ sailor: req.user.id });
  res.json(list);
});

export default router;
