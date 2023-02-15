import { Router } from "express";
import cartRoutes from "./carts/carts.routes.js";
import productRoutes from "./products/products.routes.js";
import chatRoutes from "./chat/chat.routes.js";

const router = Router();

//Routers
router.use("/carts", cartRoutes);
router.use("/products", productRoutes);
router.use("/chat", chatRoutes);

export default router;
