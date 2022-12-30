import express from "express";
import apiRoutes from "./routers/app.routers";

const PORT = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/statics", express.static("src/public"));

//Routes
app.use("/api", apiRoutes);

// Listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
