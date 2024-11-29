//Express Router
import { Router } from "express";
//Task Methods
import { addTask } from "../controllers/task.controller.js";
import { updateTask } from "../controllers/task.controller.js";
import { updateStatus } from "../controllers/task.controller.js";
import { deleteTask } from "../controllers/task.controller.js";
import { getOneTask } from "../controllers/task.controller.js";
import { allTasks } from "../controllers/task.controller.js";
//Middleware
import authRequired from "../middlewares/authRequired.middleware.js";

//Task Router
const TaskRouter = new Router()

//Add Task Method
TaskRouter.post('/addTask', authRequired, addTask)
//Update Task Method
TaskRouter.put('/updateTask/:id', authRequired, updateTask)
//Update Status Method
TaskRouter.patch('/updateStatus/:id', authRequired, updateStatus)
//Delete Task Method
TaskRouter.delete('/deleteTask/:id', authRequired, deleteTask)
//Get One Task Method
TaskRouter.get('/getOneTask/:id', authRequired, getOneTask)
//Get All Task Method
TaskRouter.get('/allTasks', authRequired, allTasks)

export default TaskRouter