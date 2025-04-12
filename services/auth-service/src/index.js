import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth Service Running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service on port ${PORT}`));
