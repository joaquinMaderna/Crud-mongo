import { Router } from "express";
import { userModel } from "../models/userModel.js";
import { UserController } from "../controllers/userController.js";

export const createUserRouter = () => {

    const userRoutes = Router()

    const userController = new UserController({ userModel })
//-------Get------------------------------------------
    userRoutes.get("/:id", userController.getUser)
//-------Post-----------------------------------------
    userRoutes.post("/", userController.createUser)
//-------Put------------------------------------------
    userRoutes.put("/:id",userController.updateUser)
//-------Delete---------------------------------------
    userRoutes.delete("/:id", userController.deleteUser)

    return userRoutes
} 