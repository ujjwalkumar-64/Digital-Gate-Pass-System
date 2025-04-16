import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import leaveRoutes from './routes/leaveRoutes.js';
import connectToDB from './utils/prismaClient.js'; // Import the database connection function
import logger from './utils/logger.js'; // Import the logger utility
import requestLogger from './middleware/requestLogger.js'; // Import the request logger middleware

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Apply the request logger middleware globally
app.use(requestLogger);

// Initialize leave routes
logger.info('Initializing leave routes...');
app.use('/api/leave', leaveRoutes);

app.get('/', (req, res) => {
  res.send('Leave Service Running...');
});

const PORT = process.env.PORT || 4000;

// Connect to the database and start the server
connectToDB().then(() => {
  logger.info('✅ Connected to the database'); // Log successful database connection
  app.listen(PORT, () => logger.info(`✅ Leave service running on port ${PORT}`)); // Log server start
}).catch((error) => {
  logger.error('❌ Failed to connect to the database:', error); // Log database connection failure
});
