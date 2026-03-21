import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  sailor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // DO
  proposedRank: { type: String, required: true },
  notes: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Promotion', promotionSchema);
