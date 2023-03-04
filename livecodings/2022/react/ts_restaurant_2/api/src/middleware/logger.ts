import pino from 'pino'
import pinoExpress from 'express-pino-logger'
import dayjs from 'dayjs'

const logger = pino({
    transport: {
        target: 'pino-http-print',
    },
    options: {
        destination: 1, // optional (default stdout)
        all: true,
        colorize: false,
        translateTime: true
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

const expressPino = pinoExpress({
    logger: logger
})

export default expressPino 