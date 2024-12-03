//Express Routes
import Router from 'express'
//Status Methods
import { addTask } from '../controllers/statusTask.controller.js'
import { getOneStatus } from '../controllers/statusTask.controller.js'
import { allStatus } from '../controllers/statusTask.controller.js'
//Auth Requiered Middleware
import authRequired from '../middlewares/authRequired.middleware.js'

//Status Router
const StatusRouter = new Router()

//Add Status
StatusRouter.post('/addStatus', authRequired, addTask)
//Get One Status
StatusRouter.get('/getOneStatus/:id', authRequired, getOneStatus)
//All Status
StatusRouter.get('/allStatus', authRequired, allStatus)

export default StatusRouter