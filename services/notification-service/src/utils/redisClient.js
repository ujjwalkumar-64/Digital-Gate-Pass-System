import { createClient } from 'redis';
import logger from '../utils/logger.js'; // Import the logger utility

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', (err) => logger.error('❌ Redis Client Error:', err)); // Log Redis client errors

async function connectToRedis() {
  try {
    if (!redis.isOpen) await redis.connect();
    logger.info('✅ Connected to Redis'); // Log successful connection
  } catch (error) {
    logger.error('❌ Error connecting to Redis:', error); // Log connection failure
    process.exit(1); // Exit the process on failure
  }
}

export { redis, connectToRedis };