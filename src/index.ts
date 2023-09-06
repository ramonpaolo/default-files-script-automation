import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import expressRateLimit from 'express-rate-limit'
import crypto from 'crypto'

// Settings
import logger from './settings/logger.settings'
import { mongoClient } from './settings/mongo.settings'
import { redis } from './settings/redis.settings'
import { sequelize } from './settings/sequelize.settings'

const { APP_ENV, PORT } = process.env;

(async () => {
    logger.info('initializing application');

    await sequelize.sync()
})()


const app = express()

app.use((req, _, next) => {
    req.headers['x-request-id'] = crypto.randomUUID()
    next()
})

app.use(expressRateLimit({
    windowMs: 60 * 1000,
    max: APP_ENV === 'test' ? 500 : 50,
    legacyHeaders: true
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(compression())

app.get('/healthcheck', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'project is working',
        uptime: process.uptime()
    })
})

const server = app.listen(PORT)

const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT']

signals.forEach((signalToListen) => {
    process.on(signalToListen, async (signal) => {
        server.close(async () => {
            await mongoClient.disconnect()
            await sequelize.close()
            await redis.quit()

            logger.warn({
                message: 'gracefully shutdown service',
                signal,
            })
        })
    })
})


export default server
