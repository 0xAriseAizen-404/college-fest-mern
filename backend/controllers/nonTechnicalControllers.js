import NonTechnicalCategory from "../models/nonTechnicalCategoryModel.js";
import Category from "../models/CategoryModel.js";
import nodemailer from "nodemailer";

// @desc    Create a new non-technical category
// @route   POST /api/non-technical-categories
// @access  Public
const createNonTechnicalCategory = async (req, res) => {
  const {
    event,
    category,
    noOfMembers,
    mainParticipant,
    college,
    coParticipants,
    audio,
    danceType,
  } = req.body;

  try {
    const newNonTechnicalCategory = new NonTechnicalCategory({
      event,
      category,
      noOfMembers,
      mainParticipant,
      college,
      coParticipants,
      audio,
      danceType,
    });

    const existingCategory = await Category.findOne({ title: category });
    existingCategory.nonTechParticipants.push(newNonTechnicalCategory._id);
    await existingCategory.save();

    const createdCategory = await newNonTechnicalCategory.save();

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
      to: createdCategory.mainParticipant.email,
      subject: `Registration for the ${createdCategory.category}`,
      html: `<h1>You are successfully registered for the event ${createdCategory.event} - ${createdCategory.category}</h1>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res
        .status(201)
        .json({ createdCategory, message: "Registered Successfully" });
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create non-technical category",
      error: error.message,
    });
  }
};

// @desc    Update an existing non-technical category
// @route   PUT /api/non-technical-categories/:id
// @access  Public
const updateNonTechnicalCategoryById = async (req, res) => {
  const { id } = req.params;
  const {
    event,
    category,
    noOfMembers,
    participant,
    college,
    coParticipants,
    participantPhoneNumber,
    participantEmail,
    audio,
    danceType,
  } = req.body;

  try {
    const updatedCategory = await NonTechnicalCategory.findByIdAndUpdate(
      id,
      {
        event,
        category,
        noOfMembers,
        participant,
        college,
        coParticipants,
        participantPhoneNumber,
        participantEmail,
        audio,
        danceType,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ message: "Non-technical category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update non-technical category",
      error: error.message,
    });
  }
};

export { createNonTechnicalCategory, updateNonTechnicalCategoryById };
