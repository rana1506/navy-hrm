import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import roleRoutes from './src/routes/roles.js';
import userRoutes from './src/routes/users.js';
import approvalRoutes from './src/routes/approvals.js';
import departmentRoutes from './src/routes/departments.js';
import divisionRoutes from './src/routes/divisions.js';
import dashboardRoutes from './src/routes/dashboards.js';
import requestRoutes from './src/routes/requests.js';
import promotionRoutes from './src/routes/promotions.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.get('/', (req,res)=>res.json({status:'ok', service:'navy-hrm-backend'}));

app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/divisions', divisionRoutes);
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/promotions', promotionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Backend running on port ${PORT}`));
