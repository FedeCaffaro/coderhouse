import { Router } from "express";
import CartManager from "../../CartManager.js";

const router = Router();
const cartManager = new CartManager("./src/Database/Carts.json");

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
    return res.status(200).json({ status: "success", data: updatedCart });
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
    return res.status(200).json({ status: "success", data: cart });
  }
  res.status(400).json({ status: "error", error: cart });
});

export default router;
