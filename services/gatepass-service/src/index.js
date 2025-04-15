import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import gatepassRoutes from './routes/gatepassRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gatepass', gatepassRoutes);

app.get('/', (req, res) => {
  res.send('Leave Service Running...');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Leave service on port ${PORT}`));
