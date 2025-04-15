import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', (err) => console.error('❌ Redis Client Error:', err));

async function connectToRedis() {
  try {
    if (!redis.isOpen) await redis.connect();
    console.log('✅ Connected to Redis');
  } catch (error) {
    console.error('❌ Error connecting to Redis:', error);
    process.exit(1);
  }
}

export { redis, connectToRedis };