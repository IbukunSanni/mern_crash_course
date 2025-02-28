import express from "express";
import dotenv from "dotenv";
import path from "path";
import Product from "./models/product.model.js";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//middleware functions runs before sending response
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server starts at http://localhost:${PORT}`);
});
