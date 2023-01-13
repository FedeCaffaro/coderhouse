import { Router } from "express";
import ProductManager from "../../ProductManager.js";
import { uploader } from "../../utils.js";

const productManager = new ProductManager("./src/Database/Products.json");
const router = Router();

//Routes

//GET Methods
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  if (!limit) {
    return res.status(200).json({ status: "success", data: products });
  }
  res.status(200).json({ status: "success", data: products.slice(0, limit) });
});

router.get("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  if (!pid) {
    return res.status(400).json({
      status: "error",
      data: "ID provided as a parameter must be a number.",
    });
  }
  const product = await productManager.getProductById(pid);
  if (product.id) {
    return res.status(200).json({ status: "success", data: product });
  }
  res.status(400).json({ status: "error", error: product });
});

//POST Methods
router.post("/", uploader.array("thumbnail"), async (req, res) => {
  const socket = req.socket;
  const product = req.body;
  const thumbnail = req.files
    ? req.files.map(
        (file) => `http://localhost:8080/product_images/${file.filename}`
      )
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
});

//DELETE Methods
router.delete("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  if (!pid) {
    return res.status(400).json({
      status: "error",
      data: "ID provided as a parameter must be a number.",
    });
  }
  const product = await productManager.deleteProduct(pid);
  if (product.title) {
    return res.status(200).json({ status: "success", data: product });
  }
  res.status(400).json({ status: "error", error: product });
});

// PUT Methods

router.put("/:pid", uploader.array("thumbnail"), async (req, res) => {
  const pid = +req.params.pid;
  const product = req.body;
  const productTarget = await productManager.getProductById(pid);
  // const price = (product.price) ? +(product.price) : productTarget.price;
  // const stock = (product.stock) ? +(product.stock) : productTarget.stock;
  const productJson = { ...product };
  const updateProduct = await productManager.updateProduct(pid, productJson);
  if (productTarget.title) {
    return res.status(200).json({ status: "success", data: productTarget });
  }
  res.status(400).json({ status: "error", error: productTarget });
});

export default router;
