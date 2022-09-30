import express from "express";
import logger from './middleware/logger'
import userRouter from "./routes/user.routes";
const app = express()

app.use(logger)
app.use(express.json())
app.use('/api/users', userRouter)

app.get('/healthcheck', (req, res, next) => res.send('OK'))


app.listen(6000, () => {
    console.info('Server started')
})

