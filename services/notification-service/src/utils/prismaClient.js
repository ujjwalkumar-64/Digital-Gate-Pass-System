import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database using Prisma');
  } catch (error) {
    console.error('❌ Error connecting to DB:', error);
    process.exit(1);
  }
};

export default connectToDB;  
