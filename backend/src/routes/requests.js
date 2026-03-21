import express from 'express';
import Request from '../models/Request.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Create request (sailor for self, DO on behalf of sailor)
router.post('/', auth, async (req, res) => {
  const { type, title, details, fromDate, toDate, onBehalfOf } = req.body;
  const doc = new Request({
    type, title, details,
    fromDate: fromDate ? new Date(fromDate) : undefined,
    toDate: toDate ? new Date(toDate) : undefined,
    createdBy: req.user.id,
    onBehalfOf: onBehalfOf || req.user.id
  });
  await doc.save();
  res.json(doc);
});

router.get('/mine', auth, async (req, res) => {
  const list = await Request.find({ $or: [{ createdBy: req.user.id }, { onBehalfOf: req.user.id }] }).sort('-createdAt');
  res.json(list);
});

// DO approves/rejects requests in own division (simplified check on role)
router.post('/:id/decision', auth, async (req, res) => {
  const { status } = req.body; // 'approved'|'rejected'
  const roles = req.user.roles || [];
  if (!roles.includes('DO') && !roles.includes('ADMIN') && !roles.includes('CO')) return res.status(403).json({ message: 'Forbidden' });
  const doc = await Request.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Request not found' });
  doc.status = status;
  doc.approvedBy = req.user.id;
  await doc.save();
  res.json(doc);
});

export default router;
