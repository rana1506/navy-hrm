import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ALL_RANKS } from '../config/ranks.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, rank, serviceNo, userType } = req.body; // userType: 'officer'|'sailor'
    if (!['officer','sailor'].includes(userType)) return res.status(400).json({ message: 'Invalid userType' });
    if (!ALL_RANKS.includes(rank)) return res.status(400).json({ message: 'Invalid rank' });
    const exists = await User.findOne({ $or: [{ email }, { serviceNo }] });
    if (exists) return res.status(409).json({ message: 'User already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const pendingApprovalBy = userType === 'officer' ? 'XO' : 'RO';
    const user = new User({
      name, email, passwordHash, rank, serviceNo,
      isOfficer: userType === 'officer',
      isSailor: userType === 'sailor',
      roles: [],
      status: 'pending',
      pendingApprovalBy
    });
    await user.save();
    return res.json({ message: 'Signup successful. Awaiting approval.', userId: user._id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.status !== 'active') return res.status(403).json({ message: 'Account not active yet' });
    const token = jwt.sign({ id: user._id, roles: user.roles, name: user.name }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
    res.json({ token, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
