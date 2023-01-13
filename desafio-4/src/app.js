import express from "express";
import apiRoutes from "./routers/app.routers.js";
import path from "path";
import { fileURLToPath } from "url";

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

// Listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
