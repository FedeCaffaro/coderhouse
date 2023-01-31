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
  const newCart = await cartManager.addCart();
  res.json({
    status: "success",
    data: newCart,
  });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const productAdded = await cartManager.addProductToCart(cid, pid);
  if (productAdded) {
    return res.status(200).json({ status: "success", data: productAdded });
  }
  res.status(400).json({ status: "error", data: productAdded });
});

router.get("/:cid", async (req, res) => {
  const cid = +req.params.cid;
  if (!cid) {
    return res.status(400).json({
      status: "error",
      data: "ID provided as a parameter must be a number.",
    });
  }
  const cart = await cartManager.getCartById(cid);
  if (cart.id) {
    return res.status(200).json({ status: "success", data: cart.products });
  }
  res.status(400).json({ status: "error", error: cart });
});

export default router;
