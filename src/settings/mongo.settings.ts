import moongoose from 'mongoose'

// Utils
import { loggerError, loggerInfo } from '../utils/logger.utils'

const { MONGO_URL } = process.env

let mongoClient: moongoose.Mongoose

;(async () => {
    try {
        mongoClient = await moongoose.connect(String(MONGO_URL))

        loggerInfo('connected with success in mongodb')

        return mongoClient
    } catch (error) {
        loggerError(error, 'failed to connect in mongodb')

        throw error
    }
})()

export {
    mongoClient,
}
