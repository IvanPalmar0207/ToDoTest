//Express Router
import { Router } from "express";
//Priority Methods
import { addPriority } from "../controllers/priority.controller.js";
import { updatePriority } from "../controllers/priority.controller.js";
import { deletePriority } from "../controllers/priority.controller.js";
import { getOnePriority } from "../controllers/priority.controller.js";
import { allPriorities } from "../controllers/priority.controller.js";
//Middelware AuthRequired
import authRequired from "../middlewares/authRequired.middleware.js";

//Priority Router
const PriorityRouter = new Router()

//Add Priority Method
PriorityRouter.post('/addPriority', authRequired, addPriority)

//Update Priority Method
PriorityRouter.put('/updatePriority/:id', authRequired, updatePriority)

//Delete Priority Method
PriorityRouter.delete('/deletePriority/:id', authRequired, deletePriority)

//Get One Priority Method
PriorityRouter.get('/getOnePriority/:id', authRequired, getOnePriority)

//All Priorities Method
PriorityRouter.get('/allPriorities', authRequired, allPriorities)

export default PriorityRouter