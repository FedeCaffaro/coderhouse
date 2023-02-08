import { Router } from "express";
import messageModel from "../../dao/models/message.model.js";
import productModel from "../../dao/models/product.model.js";
import { ProductManagerMongo } from "../../dao/mongoManagers/product.manager.js";
import { CartManagerMongo } from "../../dao/mongoManagers/cart.manager.js";

const router = Router();
const productMongoService = new ProductManagerMongo();
const cartMongoService = new CartManagerMongo();

router.get("/products", async (req, res) => {
  try {
    const products = await productMongoService.getProducts(req.query);
    res.render("index", {
      title: "E-commerce",
      styles: "index.css",
      products: products.docs,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
});

router.get("/cart/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartMongoService.getCartById(cartId);
    res.render("cart", {
      title: "Cart",
      styles: "cart.css",
      products: cart.products,
      cartId: cart._id,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
});

router.get("/chat", async (req, res) => {
  const messages = await messageModel.find().lean();
  res.render("chat", {
    title: "Chatea3",
    styles: "chat.css",
    messages,
  });
});

export default router;
