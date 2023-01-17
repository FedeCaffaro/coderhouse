import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";
import { uploader } from "../../utils.js";

const productManager = new ProductManager("./src/Database/Products.json"); // El write file esta en el node modules a nivel del package json entonces defino la ruta desde la raiz.

const router = Router();

router.get("/", async (req, res) => {
  const productsList = await productManager.getProducts();
  res.render("index", {
    products: productsList,
    title: "Products",
    style: "index.css",
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const productsList = await productManager.getProducts();
  res.render("realTimeProducts", {
    products: productsList,
    title: "Real Time Products",
    style: "index.css",
  });
});

//POST Methods
router.post(
  "/realtimeproducts",
  uploader.array("thumbnail"),
  async (req, res) => {
    // const socket = req.socket;
    const socket = req.app.get("socket");
    const product = req.body;
    const thumbnail = req.files
      ? req.files.map((file) => `http://localhost:8080/img/${file.filename}`)
      : [];
    const productObject = {
      ...product,
      thumbnail: thumbnail,
      // price: +product.price,
      // stock: +product.stock,
    };
    const newProduct = await productManager.addProduct(productObject);
    socket.emit("newProduct", newProduct);
    if (newProduct.title) {
      return res.status(200).json({ status: "success", data: newProduct });
    }
    res.status(400).json({ status: "error", error: newProduct });
  }
);

export default router;
