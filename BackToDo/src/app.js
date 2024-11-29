//Server
import express from 'express'
//Morgan
import morgan from 'morgan'
//Cookie-parser
import cookieParser from 'cookie-parser'
//Cors
import cors from 'cors'
//Routers
import PriorityRouter from './routes/priority.routes.js'
import UserRouter from './routes/user.routes.js'
import TaskRouter from './routes/task.routes.js'

//Server Instance
const app = express()

//Cors Config
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
//Morgan Debug
app.use(morgan('dev'))
//Cookie-parser instance
app.use(cookieParser())
//Server json instance
app.use(express.json())
//Parsing
app.use(express.urlencoded({extended : true}))

//Users Routers
app.use('/api', UserRouter)
//Task Routers
app.use('/api', TaskRouter)
//Priority Router
app.use('/api', PriorityRouter)

export default app