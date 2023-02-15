import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import apiRoutes from "./routers/app.routers.js";
import viewsRoutes from "./routers/views/views.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import "./config/dbConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public")));

//Routes
app.use("/api", apiRoutes);
app.use("/views", viewsRoutes);

app.engine("handlebars", handlebars.engine());
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "handlebars");

// Listen
const httpServer = app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}`)
);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("new client connected");
  app.set("socket", socket);
  app.set("io", io);
  socket.on("login", (user) => {
    socket.emit("welcome", user);
    socket.broadcast.emit("new-user", user);
  });
});
