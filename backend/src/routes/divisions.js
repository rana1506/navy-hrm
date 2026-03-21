import express from 'express';
import Division from '../models/Division.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const divs = await Division.find().populate('divisionalOfficer','name rank email');
  res.json(divs);
});

// GO assigns sailor to division
router.post('/assign', auth, requirePermission('ASSIGN_DIVISION'), async (req, res) => {
  const { userId, divisionId } = req.body;
  const user = await User.findById(userId);
  const div = await Division.findById(divisionId);
  if (!user || !div) return res.status(404).json({ message: 'User or Division not found' });
  user.division = div._id;
  await user.save();
  res.json({ message: 'Assigned division', user });
});

// GO sets DO for a division
router.post('/:id/set-do', auth, requirePermission('ASSIGN_DIVISION'), async (req, res) => {
  const { doUserId } = req.body;
  const div = await Division.findById(req.params.id);
  const doUser = await User.findById(doUserId);
  if (!div || !doUser) return res.status(404).json({ message: 'Division or DO not found' });
  div.divisionalOfficer = doUser._id;
  await div.save();
  res.json({ message: 'DO set for division', division: div });
});

export default router;
