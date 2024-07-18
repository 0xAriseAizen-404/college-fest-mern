import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventByIdMutation,
} from "../../../redux/api/eventApiSlice.js";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../../redux/features/event/eventSlice.js";
import { toast } from "react-toastify";

export const EventForm = () => {
  const { eventId } = useParams();
  const {
    data: existedEvent,
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId || "");
  const [createEvent, { isLoading: isCreatingEvent }] =
    useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdatingEvent }] =
    useUpdateEventByIdMutation();

  const { events } = useSelector((state) => state.events);
  const [eventsList, setEventsList] = useState(events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    noOfDays: "",
    location: "",
  });

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (existedEvent) {
      setFormData({
        title: existedEvent.title || "",
        description: existedEvent.description || "",
        date: existedEvent.date || "",
        image: existedEvent.image || "",
        noOfDays: existedEvent.noOfDays || "",
        location: existedEvent.location || "",
      });
    }
  }, [existedEvent]);

  const Schema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    date: z.string().nonempty("Date is required"),
    image: z.string(),
    noOfDays: z.string().nonempty("Number of days is required"),
    location: z.string().nonempty("Location is required"),
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      Schema.parse(formData);
      if (eventId) {
        const res = await updateEvent({ id: eventId, ...formData }).unwrap();
        setEventsList((prev) =>
          prev.map((item) => (item._id === res.Event._id ? res.Event : item))
        );
        dispatch(setEvents(eventsList));
        toast.success(res.message);
        navigate(`/admin/events/${res.Event._id}/categories`);
      } else {
        const res = await createEvent(formData).unwrap();
        setEventsList((prev) => [res.Event, ...prev]);
        dispatch(setEvents(eventsList));
        toast.success(res.message);
        navigate(`/admin/events/${res.Event._id}/categories`);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrMessage(err.errors[0].message);
      } else {
        toast.error(
          err?.message || "An error occurred while creating the event."
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
          />
          <input
            type="text"
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
