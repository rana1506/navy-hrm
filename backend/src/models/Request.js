import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  type: { type: String, enum: ['leave','welfare','general'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  onBehalfOf: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // DO can submit for sailor
  title: String,
  details: String,
  fromDate: Date,
  toDate: Date,
  status: { type: String, enum: ['submitted','approved','rejected'], default: 'submitted' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Request', requestSchema);
