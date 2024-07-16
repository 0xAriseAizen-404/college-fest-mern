import { asyncHandler } from "../middlewares/asyncHandler.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/createJWTtoken.js";

export const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please! Check credentials" });
  if (adminExists)
    return res.status(401).json({ message: "Admin already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const admin = await new Admin({ username, email, password: hashedPassword });
  try {
    await admin.save();
    admin.password = null;
    res.status(201).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please! Check credentials" });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    generateToken(res, admin._id);
    admin.password = null;
    res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getCurrAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password");
  if (!admins) return res.status(404).json({ message: "No Admins found" });
  try {
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const deleteAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  try {
    console.log(req.user._id + " " + admin._id);
    if (admin._id.toString() === req.user._id.toString())
      return res.status(401).json({ message: "You can't delete yourself" });
    await Admin.deleteOne({ _id: admin._id });
    res
      .status(200)
      .json({ message: "Admin deleted successfully", id: req.user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
