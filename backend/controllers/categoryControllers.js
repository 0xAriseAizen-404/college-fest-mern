import { asyncHandler } from "../middlewares/asyncHandler.js";
import Category from "../models/CategoryModel.js";
import Event from "../models/eventModel.js";
import { v2 as cloudinary } from "cloudinary";
import { getDefaultImage, images } from "../utils/defaultImages.js";
import TechnicalCategory from "../models/technicalCategoryModel.js";
import NonTechnicalCategory from "../models/nonTechnicalCategoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const {
    title,
    description,
    date,
    duration,
    image,
    minimum,
    maximum,
    isTechnical,
    price1,
    price2,
    price3,
  } = req.body;
  try {
    const event = await Event.findById(eventId.toString());
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existsCategory = await Category.findOne({ title });
    if (existsCategory)
      return res.status(409).json({ message: "Category already exists" });

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

    const category = new Category({
      event: eventId,
      title,
      description,
      date,
      image: imageUrl,
      duration,
      minimum,
      maximum,
      prizes: {
        price1,
        price2,
        price3,
      },
      isTechnical,
    });

    await category.save();

    event.categories.push(category._id);
    await event.save();

    res
      .status(201)
      .json({ message: "Category Created Successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const categories = await Category.find({}).sort({ date: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAll = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ date: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const categoryId = req.params.categoryId;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const hasIt = event.categories.find(
      (item) => item.toString() === categoryId.toString()
    );
    if (!hasIt) {
      return res.status(404).json({ message: "Category not exists in Event" });
    }

    const category = await Category.findById(categoryId)
      .populate("techParticipants")
      .populate("nonTechParticipants");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const updateCategoryById = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const categoryId = req.params.categoryId;
  // console.log(req.body);
  const {
    title,
    description,
    date,
    duration,
    image,
    minimum,
    maximum,
    isTechnical,
    price1,
    price2,
    price3,
  } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const hasIt = event.categories.find(
      (item) => item.toString() === categoryId.toString()
    );
    if (!hasIt)
      return res.status(404).json({ message: "Category not exists in Event" });
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        asset_folder: "college-fest",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const category = await Category.findById(categoryId);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (title) category.title = title;
    if (description) category.description = description;
    if (date) category.date = date;
    if (duration) category.duration = duration;
    if (imageUrl) category.image = imageUrl;
    if (minimum) category.minimum = minimum;
    if (maximum) category.maximum = maximum;
    if (isTechnical) category.isTechnical = isTechnical;
    if (price1) category.prizes.price1 = price1;
    if (price2) category.prizes.price2 = price2;
    if (price3) category.prizes.price3 = price3;

    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const categoryId = req.params.categoryId;
  try {
    const eventExits = await Event.findById(eventId);
    if (!eventExits) {
      return res.status(404).json({ message: "Event not found" });
    }

    const hasIt = eventExits.categories.find(
      (item) => item.toString() === categoryId.toString()
    );
    if (!hasIt) {
      return res.status(404).json({ message: "Category not exists in Event" });
    }

    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (category.image && !images.includes(category.image)) {
      const imgId = category.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    const event = await Event.findOneAndUpdate(
      { categories: category._id },
      { $pull: { categories: category._id } },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Delete related technical and non-technical categories
    await TechnicalCategory.deleteMany({
      _id: { $in: category.techParticipants },
    });
    await NonTechnicalCategory.deleteMany({
      _id: { $in: category.nonTechParticipants },
    });

    await Category.deleteOne({ _id: category._id });

    res
      .status(200)
      .json({ message: "Category Deleted Successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
