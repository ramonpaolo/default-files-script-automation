import Redis from 'ioredis'

// Utils
import { loggerError } from '../utils/logger.utils'

const { REDIS_URL } = process.env

const redis = new Redis(String(REDIS_URL))

const set = async (key: string, value: string, ttl: number = 3000) => {
    try {
        const wasSetedWithSuccess = await redis.setex(key, ttl, value)

        return !!wasSetedWithSuccess
    } catch (error) {
        loggerError(error, 'failed to set cache')

        return false
    }
}

const get = async (key: string) => {
    try {
        const value = await redis.get(key)

        return value
    } catch (error) {
        loggerError(error, 'failed to get value')

        return false;
    }
}

export {
    set,
    get,
    redis,
}