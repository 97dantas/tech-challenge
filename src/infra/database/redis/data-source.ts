import { createClient, RedisClientType } from 'redis';
import 'dotenv/config'

export default async (): Promise<RedisClientType> => {
    const RedisDataSource: RedisClientType = createClient({
        url: process.env.REDIS_URL
    });

    await RedisDataSource.connect()
        .then(() => console.log('Connected to Redis'))
        .catch((err) => console.error('Redis connection error:', err));
    return RedisDataSource;
};
