import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import leaveRoutes from './routes/leaveRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/leave', leaveRoutes);

app.get('/', (req, res) => {
  res.send('Leave Service Running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Leave service on port ${PORT}`));
