import { Router } from "express";
import cartRoutes from "./carts/carts.routes.js"
import productRoutes from "./products/products.routes.js"


const router = Router();

//Routers
router.use("/carts",cartRoutes);
router.use("/products",productRoutes);



export default router;