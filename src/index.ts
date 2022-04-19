import express from 'express'
import compression from 'compression'

const app = express()

app.use(compression())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Project is working : )"
    })
})

app.listen(PORT)