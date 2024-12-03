//Express Router
import { Router } from "express";
//User Methods
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/user.controller.js";
import { logOutUser } from "../controllers/user.controller.js";
//Auth Required Middleware
import authRequired from "../middlewares/authRequired.middleware.js";

const UserRouter = new Router()

//Register User Method
UserRouter.post('/register', registerUser)
//Login User Method
UserRouter.post('/loginUser', loginUser)
//Update User Method
UserRouter.put('/updateUser/:id', authRequired, updateUser)
//Delete User Method
UserRouter.delete('/deleteUser/:id', authRequired, deleteUser)
//Verify Token Method
UserRouter.get('/verifyToken', verifyToken)
//Logout Method
UserRouter.post('/logout', authRequired, logOutUser)

export default UserRouter