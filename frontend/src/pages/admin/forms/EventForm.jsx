import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventByIdMutation,
} from "../../../redux/api/eventApiSlice.js";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";

export const EventForm = () => {
  const { eventId } = useParams();
  const {
    data: event,
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId || undefined);
  const [createEvent, { isLoading: isCreatingEvent }] =
    useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdatingEvent }] =
    useUpdateEventByIdMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    noOfDays: 0,
    location: "",
  });

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        image: event.image || "",
        noOfDays: event.noOfDays || 0,
        location: event.location || "",
      });
    }
  }, [event]);

  const Schema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    date: z.string().nonempty("Date is required"),
    image: z.string(),
    noOfDays: z.number().int().min(0, "Number of days is required"),
    location: z.string().nonempty("Location is required"),
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newValue = e.target.type === "number" ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  const [img, setImg] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = {
        ...formData,
        noOfDays: parseInt(formData.noOfDays) || 0,
      };
      Schema.parse(parsedData);
      if (eventId) {
        try {
          const res = await updateEvent({ eventId, parsedData }).unwrap();
          toast.success(res.message);
          navigate(`/admin/events/${res.event._id}/`);
        } catch (err) {
          if (err instanceof z.ZodError) {
            setErrMessage(err.errors[0].message);
          } else {
            toast.error(
              err?.message || "An error occurred while creating the event."
            );
          }
        }
      } else {
        try {
          const res = await createEvent(parsedData).unwrap();
          toast.success(res.message);
          navigate(`/admin/events/${res.event._id}/`);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err);
            setErrMessage(err.errors[0].message);
          } else {
            console.log(err);
            toast.error(
              err?.data?.message ||
                "An error occurred while creating the event."
            );
          }
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.message);
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
          {eventId ? "Edit Event" : "Create Event"}
        </h1>
        {errMessage && <p className="text-red-500">{errMessage}</p>}
        <div className="flex flex-col gap-2 w-5/6 sm:w-4/6 lg:w-3/6">
          <input
            type="text"
            name="title"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter event title..."
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter event description..."
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
          {img && (
            <img src={img} className="w-48 h-48 object-cover mx-auto my-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
          />
          <input
            type="number"
            name="noOfDays"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter number of days..."
            value={formData.noOfDays}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            placeholder="Enter event location..."
            value={formData.location}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="text-white bg-green-500 px-4 py-2 rounded"
          >
            {isCreatingEvent || isUpdatingEvent
              ? "Loading..."
              : eventId
              ? "Update Event"
              : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};
