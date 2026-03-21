import express from 'express';
import { auth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';
import User from '../models/User.js';
import Department from '../models/Department.js';
import Division from '../models/Division.js';
import Request from '../models/Request.js';
import Promotion from '../models/Promotion.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('department').populate('division');
  const requests = await Request.find({ $or: [{ createdBy: user._id }, { onBehalfOf: user._id }] }).sort('-createdAt');
  const promotions = await Promotion.find({ sailor: user._id });
  res.json({ user, requests, promotions });
});

router.get('/department/:id', auth, requirePermission('VIEW_DEPT_DASHBOARD'), async (req, res) => {
  const deptId = req.params.id;
  const dept = await Department.findById(deptId);
  if (!dept) return res.status(404).json({ message: 'Department not found' });
  const sailors = await User.find({ department: deptId, roles: { $in: ['SAILOR'] } });
  const requests = await Request.find({ onBehalfOf: { $in: sailors.map(s => s._id) } });
  res.json({ department: dept, sailorCount: sailors.length, requests });
});

router.get('/division/:id', auth, requirePermission('VIEW_DIV_DASHBOARD'), async (req, res) => {
  const divId = req.params.id;
  const div = await Division.findById(divId).populate('divisionalOfficer','name');
  if (!div) return res.status(404).json({ message: 'Division not found' });
  const sailors = await User.find({ division: divId, roles: { $in: ['SAILOR'] } });
  const requests = await Request.find({ $or: [ { createdBy: { $in: sailors.map(s=>s._id) } }, { onBehalfOf: { $in: sailors.map(s=>s._id) } } ] });
  res.json({ division: div, sailorCount: sailors.length, requests });
});

export default router;
