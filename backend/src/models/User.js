import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  serviceNo: { type: String, unique: true, required: true },
  rank: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: String }],
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
  isOfficer: { type: Boolean, default: false },
  isSailor: { type: Boolean, default: false },
  status: { type: String, enum: ['pending','active','rejected'], default: 'pending' },
  pendingApprovalBy: { type: String, enum: ['XO','RO',null], default: null }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
