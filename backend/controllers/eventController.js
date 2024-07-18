import { asyncHandler } from "../middlewares/asyncHandler.js";
import Event from "../models/eventModel.js";
import { getDefaultImage, images } from "../utils/defaultImages.js";
import { v2 as cloudinary } from "cloudinary";

export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, noOfDays, image } = req.body;
  try {
    const event = await Event.findOne({ title });
    if (event)
      return res.status(401).json({ message: "Event already created" });
    let imageUrl;
    if (!image) {
      imageUrl = getDefaultImage();
    } else {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        asset_folder: "college-fest",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }
    const createdEvent = await Event({
      title,
      description,
      date,
      noOfDays,
      location,
      image: imageUrl,
    });

    await createdEvent.save();
    res
      .status(200)
      .json({ message: "Event Created Successfully", Event: createdEvent });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const updateEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { description, date, noOfDays, location, image } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.description = description || event.description;
    event.date = date || event.date;
    event.noOfDays = noOfDays || event.noOfDays;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        asset_folder: "college-fest",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }
    event.image = imageUrl || event.image;
    event.location = location || event.location;
    await event.save();
    res.status(200).json({
      Event: event,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const deleteEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.image) {
      const exists = images.find((img) => img === event.image);
      if (!exists) {
        const imgId = event.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
    }
    if (event) await Event.deleteOne({ _id: event._id });
    res
      .status(200)
      .json({ message: "Event Deleted Successfully", Event: event });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Post not Found" });
  }
});
