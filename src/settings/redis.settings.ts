import Redis from 'ioredis'

// Utils
import { loggerError } from '../utils/logger.utils'

const redis = new Redis('redis://redis')

const set = async (key: string, value: string, ttl: number = 3000) => {
    try {
        const wasSetedWithSuccess = await redis.setex(key, ttl, value)

        return !!wasSetedWithSuccess
    } catch (error) {
        loggerError(error)
        return false
    }
}

const get = async (key: string) => {
    try {
        const value = await redis.get(key)

        return value
    } catch (error) {
        loggerError(error)
    }
}

export {
    set,
    get,
}