import { Router } from "express";
import UserController from "../controllers/userControllers";
import ProductController from "../controllers/productController";
import CategoriesController from '../controllers/categoriesController'
import Authenticate from '../middleware/authenticate'

const userRoutes = Router();
const userController = new UserController();
const productController = new ProductController();
const categoriesController = new CategoriesController();
const authenticate = new Authenticate();

userRoutes.post("/signup",userController.userRegister);
userRoutes.post("/login",userController.userLogin);
userRoutes.post("/products",authenticate.authenticate,productController.fetchProductsBytypes);
userRoutes.get("/categories",authenticate.authenticate,categoriesController.getCategories)

export default userRoutes;