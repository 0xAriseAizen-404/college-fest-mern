import { asyncHandler } from "../middlewares/asyncHandler.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/createJWTtoken.js";

export const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please! Check credentials" });
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    return res.status(401).json({ message: "Admin already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({ username, email, password: hashedPassword });

  try {
    await admin.save();
    admin.password = undefined;
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please! Check credentials" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(res, admin._id);
    admin.password = undefined;
    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getCurrAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find({})
      .sort({ updatedAt: -1 })
      .select("-password");

    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const deleteAdminById = asyncHandler(async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(401).json({ message: "You can't delete yourself" });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin deleted successfully", adminId: admin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const logOutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
