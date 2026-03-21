import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  name: { type: String, required: true },
  headRole: { type: String }, // XO, EO, LO, SO, MO
  headUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema);
