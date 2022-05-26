import express from 'express'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(compression())

const PORT = process.env.PORT || 3000

app.get('/', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Project is working : )'
    })
})

app.listen(PORT)