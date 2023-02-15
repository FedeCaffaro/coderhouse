import { Router } from "express";
import CartManager from "../../dao/fileManagers/CartManager.js";
import { CartManagerMongo } from "../../dao/mongoManagers/cart.manager.js";

// const system = "mongo";
// if (system === "filesystem") {
//   const cartManager = new CartManager("./src/files/Carts.json");
// } else {
//   const cartManager = new CartManagerMongo();
// }
const cartManager = new CartManagerMongo();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json({
      status: "success",
      data: carts,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.addCart();
    res.send({
      status: "success",
      data: cart,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = +req.params.cid;
    const pid = +req.params.pid;
    const amount = +req.body.amount;
    const productAdded = await cartManager.addProductToCart(cid, pid, amount);
    if (productAdded) {
      return res.status(200).json({ status: "success", data: productAdded });
    }
  } catch (error) {
    res.status(400).json({ status: "error", data: productAdded });
  }
});

router.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const cart = await cartManager.getCartById(id);
    res.send({
      status: "success",
      cart: cart,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const newProducts = req.body;
  try {
    const updatedCart = await cartManager.updateProducts(cid, newProducts);
    res.send({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const amount = req.body.quantity;
  try {
    if (!amount) {
      throw new Error("an amount of product must be provided");
    }
    const updateProduct = await cartManager.addProductToCart(cid, pid, amount);
    res.send({
      status: "success",
      payload: updateProduct,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const deletedProduct = await cartManager.deleteProductFromCart(cid, pid);
    res.send({
      status: "success",
      newCart: deletedProduct,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartManager.deleteAllProducts(cid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
});

export default router;
