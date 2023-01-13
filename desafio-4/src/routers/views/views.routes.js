import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const productManager = new ProductManager("./src/Database/Products.json");
const router = Router();

router.get("/", async (req, res) => {
  const productsList = await productManager.getProducts();
  res.render("index", {
    products: productsList,
    title: "Products",
    style: "index.css",
  });
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", {
  });
});

export default router;
