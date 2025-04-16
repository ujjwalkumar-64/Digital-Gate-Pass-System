import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import connectToDB from './utils/prismaClient.js';  
import logger from './utils/logger.js';  
import requestLogger from './middlewares/requestLogger.js';  

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

 
app.use(requestLogger);
 
logger.info('Initializing admin routes...');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Admin Service Running...');
});

const PORT = process.env.PORT || 5005;

 
connectToDB().then(() => {
  logger.info('✅ Connected to the database');  
  app.listen(PORT, () => logger.info(`✅ Admin Service running on port ${PORT}`));  
}).catch((error) => {
  logger.error('❌ Failed to connect to the database:', error); 
});
