import express from "express";
import ProductManager from "./ProductManager.js";
import * as path from "path";

const app = express();
const productManager = new ProductManager(
  path.resolve("src/data/Products.json")
);

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  if (!limit) {
    return res.status(200).send(products);
  }
  res.status(200).send(products.slice(0, limit));
});

app.get("/products/:pid", async (req, res) => {
  const product = await productManager.getProductById(+req.params.pid);
  res.status(200).send(product);
});

app.listen(8080, () => console.log("Server up & listening on port 8080"));
