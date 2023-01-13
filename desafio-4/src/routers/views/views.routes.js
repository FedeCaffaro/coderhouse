import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const productManager = new ProductManager("./src/Database/Products.json");
const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", { products: products , title: "Products"});
});

export default router;
