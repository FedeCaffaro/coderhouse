import { Router } from "express";
import messageModel from "../../dao/models/message.model.js";
import productModel from "../../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productModel.find().lean();
  res.render("index", {
    title: "E-commerce",
    styles: "index.css",
    products,
  });
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
