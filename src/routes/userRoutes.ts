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
// userRoutes.use(authenticate.authenticate);
userRoutes.post("/products",productController.fetchProductsBytypes);
userRoutes.get("/productsId",productController.fetchProductsById);
userRoutes.get("/categories",categoriesController.getCategories)

export default userRoutes;