import express from 'express'
import pinoLogger from './middleware/logger'
import userRouter from './routes/user.route'
import productRouter from './routes/product.route'

require('dotenv').config()

const app = express()
const port = 5000

app.use(pinoLogger)
app.use(express.json())

app.get('/healthcheck', (req, res) => res.send('OK'))

app.use('/api', userRouter.baseRouter, productRouter.baseRouter)
app.use('/api/admin', userRouter.adminRouter)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})


