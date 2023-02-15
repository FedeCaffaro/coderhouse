import { Router } from "express";
import ProductManager from "../../dao/fileManagers/ProductManager.js";
import { uploader } from "../../utils.js";
import { ProductManagerMongo } from "../../dao/mongoManagers/product.manager.js";

// const system = "mongo";
// if (system === "filesystem") {
//   const productManager = new ProductManager("./src/files/Products.json");
// } else {
//   const productManager = new ProductManagerMongo();
// }

const productManager = new ProductManagerMongo();

const router = Router();

//Routes

//GET Methods
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query);
    return res.send({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: null,
      nexLink: null,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await productManager.getProductById(id);
    res.send({ product });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

//POST Methods
router.post("/", uploader.array("thumbnail"), async (req, res) => {
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
  if (newProduct.title) {
    return res.status(200).json({ status: "success", data: newProduct });
  }
  res.status(400).json({ status: "error", error: newProduct });
});

router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  try {
    if (req.body.id) {
      throw new Error("No id must be provided");
    }
    const updateProduct = await productManager.updateProduct(
      productId,
      req.body
    );
    res.send({
      status: "success",
      newProduct: updateProduct,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  try {
    const deleteProduct = await productManager.deleteProduct(productId);
    res.send({
      status: "success",
      deletedProduct: deleteProduct,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

export default router;
