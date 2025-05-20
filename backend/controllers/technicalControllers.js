import TechnicalCategory from "../models/technicalCategoryModel.js";
import Category from "../models/CategoryModel.js";
import nodemailer from "nodemailer";

// @desc    Create a new technical category
// @route   POST /api/technical-categories
// @access  Public
const createTechnicalCategory = async (req, res) => {
  const {
    event,
    category,
    noOfParticipants,
    mainParticipant,
    coParticipants,
    college,
  } = req.body;

  try {
    const newTechnicalCategory = new TechnicalCategory({
      event,
      category,
      noOfParticipants,
      mainParticipant,
      coParticipants,
      college,
    });

    const existingCategory = await Category.findOne({ title: category });
    existingCategory.techParticipants.push(newTechnicalCategory._id);
    await existingCategory.save();

    await newTechnicalCategory.save();

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      post: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: newTechnicalCategory.mainParticipant.email,
      subject: `Registration for the ${newTechnicalCategory.category}`,
      html: `<h1>You are successfully registered for the event ${newTechnicalCategory.event} - ${newTechnicalCategory.category}</h1>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(201)
        .json({ newTechnicalCategory, message: "Registered Successfully" });
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create technical category",
      error: error.message,
    });
  }
};

// @desc    Update an existing technical category
// @route   PUT /api/technical-categories/:id
// @access  Public
const updateTechnicalCategoryById = async (req, res) => {
  const { id } = req.params;
  const {
    event,
    category,
    noOfParticipants,
    mainParticipant,
    coParticipants,
    college,
  } = req.body;

  try {
    const updatedCategory = await TechnicalCategory.findByIdAndUpdate(
      id,
      {
        event,
        category,
        noOfParticipants,
        mainParticipant,
        coParticipants,
        college,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Technical category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update technical category",
      error: error.message,
    });
  }
};

export { createTechnicalCategory, updateTechnicalCategoryById };
