import { PrismaClient } from '../generated/prisma/index.js';
import logger from '../utils/logger.js';  

const prisma = new PrismaClient();

const connectToDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to PostgreSQL database using Prisma');  
  } catch (error) {
    logger.error('❌ Error connecting to DB:', error);  
    process.exit(1);  
  }
};

export default connectToDB;
