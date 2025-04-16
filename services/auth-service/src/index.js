import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import requestLogger from './middlewares/requestLogger.js'; 
import connectToDB from './utils/prismaClient.js';  
import logger from './utils/logger.js';  
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

 
app.use(requestLogger);
 
logger.info('Initializing auth routes...');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth Service Running...');
});

const PORT = process.env.PORT || 3000;

 
connectToDB().then(() => {
  logger.info('✅ Connected to the database');  
  app.listen(PORT, () => logger.info(`✅ Auth service running on port ${PORT}`));  
}).catch((error) => {
  logger.error('❌ Failed to connect to the database:', error);  
});
