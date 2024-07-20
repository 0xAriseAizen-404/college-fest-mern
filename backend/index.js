import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import techRoutes from "./routes/technicalRoutes.js";
import nonTechRoutes from "./routes/nonTechnicalRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
);  

app.listen(PORT, () => {
  console.log(`App is listening on port - ${PORT}`);
});

app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/nonTechForm", nonTechRoutes);
app.use("/api/techForm", techRoutes);
