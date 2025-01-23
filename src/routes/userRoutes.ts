import { Router } from "express";
import UserController from "../controllers/userControllers";
import ProductController from "../controllers/productController";
import CategoriesController from '../controllers/categoriesController'

const userRoutes = Router();
const userController = new UserController();
const productController = new ProductController();
const categoriesController = new CategoriesController();

userRoutes.post("/signup",userController.userRegister);
userRoutes.post("/login",userController.userLogin);
userRoutes.post("/products",productController.fetchProductsWithtypes);
userRoutes.get("/categories",categoriesController.getCategories)

export default userRoutes;