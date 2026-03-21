import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../src/config/db.js';
import { runSeed } from '../src/utils/seedData.js';

(async () => {
  await connectDB();
  const out = await runSeed();
  console.log('Seeded:', Object.keys(out));
  process.exit(0);
})();
