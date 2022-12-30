import { Router } from "express";
import cartRoutes from "./cart/cart.routes"
import productRoutes from "./products/products.routes"


const router = Router();

//Routers
router.use("/cart",cartRoutes);
router.use("/products",productRoutes);



export default router;