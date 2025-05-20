import { asyncHandler } from "../middlewares/asyncHandler.js";
import Event from "../models/eventModel.js";
import Category from "../models/CategoryModel.js";
import TechnicalCategory from "../models/technicalCategoryModel.js";
import NonTechnicalCategory from "../models/nonTechnicalCategoryModel.js";
import { getDefaultImage, images } from "../utils/defaultImages.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new event
export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, noOfDays, image } = req.body;

  try {
    const existingEvent = await Event.findOne({ title });

    if (existingEvent) {
      return res.status(401).json({ message: "Event already exists" });
    }

    let imageUrl = image
      ? await uploadImageToCloudinary(image)
      : getDefaultImage();

    const createdEvent = new Event({
      title,
      description,
      date,
      noOfDays,
      location,
      image: imageUrl,
    });

    await createdEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: createdEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all events with populated categories, techParticipants, and nonTechParticipants
export const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ date: 1 })
      .populate({
        path: "categories",
        populate: [
          { path: "techParticipants" },
          { path: "nonTechParticipants" },
        ],
      });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getAllParticipants = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ date: 1 })
      .populate({
        path: "categories",
        populate: [
          { path: "techParticipants" },
          { path: "nonTechParticipants" },
        ],
      });

    const participants = events.flatMap((event) => {
      const techParticipants = event.categories.reduce(
        (acc, category) => [...acc, ...category.techParticipants],
        []
      );

      const nonTechParticipants = event.categories.reduce(
        (acc, category) => [...acc, ...category.nonTechParticipants],
        []
      );

      return [...techParticipants, ...nonTechParticipants];
    });
    console.log(participants);
    res.status(201).json(participants);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get an event by ID
export const getEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id).populate({
      path: "categories",
      populate: [{ path: "techParticipants" }, { path: "nonTechParticipants" }],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update an event by ID
export const updateEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { description, date, noOfDays, location, image } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (description) event.description = description;
    if (date) event.date = date;
    if (noOfDays) event.noOfDays = noOfDays;
    if (location) event.location = location;
    if (image) {
      event.image = await uploadImageToCloudinary(image);
    }

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete an event by ID
export const deleteEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id).populate({ path: "categories" });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete Cloudinary image if it exists and is not in the images array
    if (event.image && !images.includes(event.image)) {
      const imgId = event.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    // Delete related technical and non-technical categories
    for (const category of event.categories) {
      await TechnicalCategory.deleteMany({
        _id: { $in: category.techParticipants },
      });
      await NonTechnicalCategory.deleteMany({
        _id: { $in: category.nonTechParticipants },
      });
    }

    await Category.deleteMany({ _id: { $in: event.categories } });

    await Event.deleteOne({ _id: event._id });

    res.status(200).json({ message: "Event deleted successfully", event });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (image) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      asset_folder: "college-fest",
      resource_type: "image",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw new Error("Image upload failed");
  }
};
