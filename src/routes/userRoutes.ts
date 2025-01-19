import { Router } from "express";
import UserController from "../controllers/userControllers";
import ProductController from "../controllers/productController";

const userRoutes = Router();
const userController = new UserController();
const productController = new ProductController();

userRoutes.post("/signup",userController.userRegister);
userRoutes.post("/login",userController.userLogin);
userRoutes.post("/products",productController.fetchProductsWithtypes);

export default userRoutes;