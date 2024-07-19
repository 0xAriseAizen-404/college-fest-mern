import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryByIdMutation,
} from "../../../redux/api/categoryApiSlice.js";
import { useGetEventByIdQuery } from "../../../redux/api/eventApiSlice.js";

export const CategoryForm = () => {
  const { eventId, categoryId } = useParams();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    event: "",
    description: "",
    date: "",
    image: "",
    minimum: "",
    maximum: "",
    price1: "",
    price2: "",
    price3: "",
    isTechnical: false,
    duration: "",
  });

  // Error message state
  const [errMessage, setErrMessage] = useState("");

  // Mutation hooks for API calls
  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryByIdMutation();

  // Fetch existing category data if editing
  const {
    data: existingCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoryByIdQuery({ eventId, categoryId });

  // Fetch existing event data
  const { data: existingEvent } = useGetEventByIdQuery(eventId);

  // Effect to populate form data when existingCategory changes
  useEffect(() => {
    if (existingCategory) {
      setFormData({
        title: existingCategory.title || "",
        description: existingCategory.description || "",
        date: existingCategory.date || "",
        image: existingCategory.image || "",
        minimum: existingCategory.minimum || 0,
        maximum: existingCategory.maximum || 0,
        price1: existingCategory.prizes?.price1 || 0,
        price2: existingCategory.prizes?.price2 || 0,
        price3: existingCategory.prizes?.price3 || 0,
        isTechnical: existingCategory.isTechnical || false,
        duration: existingCategory.duration || 0,
      });
    }
  }, [existingCategory]);

  // Form validation schema
  const formSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    date: z.string().nonempty("Date is required"),
    image: z.string(),
    minimum: z.number().min(1, "Minimum must be a positive number"),
    maximum: z.number().min(1, "Maximum must be a positive number"),
    price1: z.number().min(0, "Price 1 must be a non-negative number"),
    price2: z.number().min(0, "Price 2 must be a non-negative number"),
    price3: z.number().min(0, "Price 3 must be a non-negative number"),
    isTechnical: z.boolean(),
    duration: z.number().min(0, "Duration must be a non-negative number"),
  });

  // Handle form input change
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newValue = e.target.type === "number" ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const [img, setImg] = useState("");

  // Handle image upload
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      if (categoryId) {
        try {
          const res = await updateCategory({
            eventId,
            categoryId,
            formData,
          }).unwrap();

          toast.success(res.message);
          navigate(`/admin/events/${eventId}`);
        } catch (err) {
          if (err instanceof z.ZodError) {
            setErrMessage(err.errors[0].message);
          } else {
            toast.error(
              err?.message || "An error occurred while updating the category."
            );
          }
        }
      } else {
        try {
          const res = await createCategory({ formData, eventId }).unwrap();
          toast.success(res.message);
          navigate(`/admin/events/${eventId}`);
        } catch (err) {
          if (err instanceof z.ZodError) {
            setErrMessage(err.errors[0].message);
          } else {
            toast.error(
              err?.data?.message ||
                "An error occurred while creating the category."
            );
          }
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrMessage(err.errors[0].message);
      } else {
        toast.error(
          err?.data?.message || "An error occurred while creating the category."
        );
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-2"
      >
        <h1 className="text-2xl font-bold">
          {categoryId
            ? `Edit Category for ->  ${existingEvent?.title}`
            : `Create Category for ->  ${existingEvent?.title}`}
        </h1>
        {errMessage && <p className="text-red-500">{errMessage}</p>}
        <div className="flex flex-col gap-2 w-5/6 sm:w-4/6 lg:w-3/6">
          <input
            type="text"
            name="title"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter category title..."
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter category description..."
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            value={formData.date}
            onChange={handleChange}
          />
          {img && <img src={img} className="w-48 h-48 object-cover mx-auto my-2" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
          />
          <input
            type="number"
            name="minimum"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter minimum participants..."
            value={formData.minimum}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maximum"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter maximum participants..."
            value={formData.maximum}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price1"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter first prize amount..."
            value={formData.price1}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price2"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter second prize amount..."
            value={formData.price2}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price3"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter third prize amount..."
            value={formData.price3}
            onChange={handleChange}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isTechnical"
              className="mr-2"
              checked={formData.isTechnical}
              onChange={handleCheckboxChange}
            />
            <span>Is technical?</span>
          </label>
          <input
            type="number"
            name="duration"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter category duration..."
            value={formData.duration}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-700 focus:outline-none"
            disabled={isCreatingCategory || isUpdatingCategory}
          >
            {categoryId ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};
