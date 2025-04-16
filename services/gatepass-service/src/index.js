import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import gatepassRoutes from './routes/gatepassRoutes.js';
import connectToDB from './utils/prismaClient.js';  
import logger from './utils/logger.js';  
import requestLogger from './middleware/requestLogger.js';  

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
 
app.use(requestLogger);

 
logger.info('Initializing gatepass routes...');
app.use('/api/gatepass', gatepassRoutes);

app.get('/', (req, res) => {
  res.send('Gatepass Service Running...');
});

const PORT = process.env.PORT || 4001;

 
connectToDB().then(() => {
  logger.info('✅ Connected to the database');  
  app.listen(PORT, () => logger.info(`✅ Gatepass service running on port ${PORT}`));  
}).catch((error) => {
  logger.error('❌ Failed to connect to the database:', error);  
});
