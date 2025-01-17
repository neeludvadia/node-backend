import { Router } from "express";
import UserController from "../controllers/userControllers";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/signup",userController.userRegister);
userRoutes.post("/login",userController.userLogin);

export default userRoutes;