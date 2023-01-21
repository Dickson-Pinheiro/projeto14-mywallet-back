import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { createUserSchema } from "../schema/createUserSchema.js";
import { loginUserSchema } from "../schema/loginUserSchema.js";

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(createUserSchema), userController.createUser)
userRouter.post("/sign-in", validateSchema(loginUserSchema), userController.userLogin)

export { userRouter }