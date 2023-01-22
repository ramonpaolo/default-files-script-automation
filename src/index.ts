import express from 'express'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressRateLimit from 'express-rate-limit'

// Settings
import logger from './settings/logger.settings'

dotenv.config();

logger.info('initializing application');

const app = express()

app.use(expressRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    legacyHeaders: true
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(compression())

const PORT = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000

app.get('/healthcheck', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'project is working',
        uptime: process.uptime()
    })
})

const server = app.listen(PORT)

export default server