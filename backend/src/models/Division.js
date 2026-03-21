import mongoose from 'mongoose';

const divisionSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: { type: String, required: true },
  divisionalOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Division', divisionSchema);
