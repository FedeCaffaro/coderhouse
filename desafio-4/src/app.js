import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routers/app.routers.js";
import viewsRoutes from "./routers/views/views.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080;
const app = express();

import ProductManager from "./managers/ProductManager.js";
const productManager = new ProductManager("./src/Database/Products.json");

// Template Engine
app.engine("handlebars", handlebars.engine());
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "handlebars");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public")));

//Routes
app.use("/api", apiRoutes);
app.use("/", viewsRoutes);

// Listen
const httpServer = app.listen(PORT, () => {
  console.log("Listening on port => ", PORT);
});

// Sockets
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New client connected!");

  // Now all routes & middleware will have access to req.io
  // app.use((req, res, next) => {
  //   req.socket = socket;
  //   return next();
  // });
  socket.on("deleteProduct", async (data) => {
    await productManager.deleteProduct(data);
    // socketServer.emit("deletedProduct",)
  });
  app.set("socket", socket);
});
