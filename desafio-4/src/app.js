import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routers/app.routers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080;
const app = express();

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

// Listen
const httpServer = app.listen(PORT, () => {
  console.log("Server is up an running on port ", PORT);
});

// Sockets
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected!");
});
