import { asyncHandler } from "../middlewares/asyncHandler.js";
import Category from "../models/CategoryModel.js";
import Event from "../models/eventModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  const {
    event,
    title,
    description,
    date,
    duration,
    image,
    minimum,
    maximum,
    isTechnical,
  } = req.body;
  try {
    const category = await Category({
      event,
      title,
      description,
      date,
      duration,
      minimum,
      maximum,
      isTechnical,
    });

    // image for Category
    // cloudinary function

    await category.save();
    await Event.findByIdAndUpdate(
      event,
      { $push: { categories: category._id } },
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ message: "Category Created Successfully", Category: category });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const updateCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { description, date, duration, image, minimum, maximum, isTechnical } =
    req.body;
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    category.description = description || category.description;
    category.date = date || category.date;
    category.duration = duration || category.duration;
    category.image = image || category.image;
    category.minimum = minimum || category.minimum;
    category.maximum = maximum || category.maximum;
    category.isTechnical = isTechnical || category.isTechnical;
    await category.save();
    res
      .status(201)
      .json({ message: "Category updated successfull", Category: category });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Category.deleteOne({ _id: id });
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
