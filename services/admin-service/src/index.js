import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Admin Service running on port ${PORT}`));
