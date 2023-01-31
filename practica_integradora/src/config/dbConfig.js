import mongoose from "mongoose";
import { options } from "./options.js";

mongoose.connect(options.mongoDb.url, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Conexion a la db exitosa");
});
