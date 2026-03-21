import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://rana1506:rana1506@cluster0.ogqjc4o.mongodb.net/navy_hrm?appName=Cluster0';
  try {
    await mongoose.connect(uri, { dbName: 'navy_hrm' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};
