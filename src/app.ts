import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { connect } from './db/db'
import { router } from './routes'
const PORT = process.env.PORT || 3001
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)
app.listen(PORT , async()=>{
    connect()
    console.log(`Runing in the port http://localhost:${PORT}/`)
})