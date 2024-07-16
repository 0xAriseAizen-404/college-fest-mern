import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port - ${PORT}`);
});

app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/category", categoryRoutes);
