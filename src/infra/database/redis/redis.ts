import { RedisClientType } from 'redis';
import {ICaching} from "./ICaching";

export class RedisCache<T> implements ICaching<T>{

    constructor(private client: RedisClientType) {}

    async set(key: string, value: T, expirationInSeconds?: number): Promise<void> {
        const serializedValue = JSON.stringify(value);
        if (expirationInSeconds) {
            await this.client.set(key, serializedValue, { EX: expirationInSeconds });
        } else {
            await this.client.set(key, serializedValue);
        }
    }

    async get(key: string): Promise<T | null> {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }
}
