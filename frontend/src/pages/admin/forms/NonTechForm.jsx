import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateNonTechnicalCategoryMutation } from "../../../redux/api/nonTechnicalCategoryApiSlice.js";
import { useGetEventByIdQuery } from "../../../redux/api/eventApiSlice.js";
import { useGetCategoryByIdQuery } from "../../../redux/api/categoryApiSlice.js";

export const NonTechForm = () => {
  const { eventId, categoryId } = useParams();
  const navigate = useNavigate();

  // Mutation hook for API call
  const [createNonTechnicalCategory, { isLoading: isCreating }] =
    useCreateNonTechnicalCategoryMutation();

  // Fetch existing event data
  const { data: existingEvent } = useGetEventByIdQuery(eventId);
  const { data: existingCategory } = useGetCategoryByIdQuery({
    eventId,
    categoryId,
  });
  // console.log(existingCategory);

  // Form state
  const [formData, setFormData] = useState({
    event: "",
    category: "",
    noOfMembers: 1,
    mainParticipant: {
      name: "",
      branch: "",
      rollNo: "",
      email: "",
      phoneNumber: "",
    },
    college: "",
    coParticipants: [],
    audio: "",
    danceType: "",
  });

  useEffect(() => {
    if (existingEvent && existingCategory) {
      setFormData((prev) => ({
        ...prev,
        event: existingEvent.title,
        category: existingCategory.title,
      }));
    }
  }, [existingEvent, existingCategory]);

  // Error message state
  const [errMessage, setErrMessage] = useState("");

  // Form validation schema
  const formSchema = z.object({
    event: z.string().nonempty("Event is required"),
    category: z.string().nonempty("Category is required"),
    noOfMembers: z
      .number()
      .int()
      .min(1, "Number of members must be at least 1"),
    mainParticipant: z.object({
      name: z.string().nonempty("Participant name is required"),
      branch: z.string(),
      rollNo: z.string(),
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),
      phoneNumber: z.string().nonempty("Phone number is required"),
    }),
    college: z.string().nonempty("College is required"),
    coParticipants: z.array(
      z.object({
        name: z.string().nonempty("Co-participant name is required"),
        rollNo: z.string(),
        branch: z.string(),
      })
    ),
    audio: z.string().optional(),
    danceType: z.string().optional(),
  });

  // Handle form input change
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newValue = e.target.type === "number" ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  // Handle nested input change for participant and co-participants
  const handleNestedChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index === null) {
      setFormData((prev) => ({
        ...prev,
        mainParticipant: { ...prev.mainParticipant, [name]: value },
      }));
    } else {
      const updatedCoParticipants = formData.coParticipants.map((cp, i) =>
        i === index ? { ...cp, [name]: value } : cp
      );
      setFormData((prev) => ({
        ...prev,
        coParticipants: updatedCoParticipants,
      }));
    }
  };

  // Handle adding a new co-participant
  const handleAddCoParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      coParticipants: [
        ...prev.coParticipants,
        { name: "", branch: "", rollNo: "" },
      ],
    }));
  };

  // Handle removing a co-participant
  const handleRemoveCoParticipant = (index) => {
    const updatedCoParticipants = formData.coParticipants.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, coParticipants: updatedCoParticipants }));
  };

  // Handle audio file upload
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, audio: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      try {
        const res = await createNonTechnicalCategory(formData).unwrap();
        console.log(res);
        toast.success(res.message);
        navigate(`/events/${eventId}`);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setErrMessage(err.errors[0].message);
        } else {
          toast.error(
            err?.data?.message ||
              "An error occurred while creating the non-technical category."
          );
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrMessage(err.errors[0].message);
      } else {
        toast.error(
          err?.data?.message ||
            "An error occurred while creating the non-technical category."
        );
      }
    }
  };

  return (
    <div className="py-4 pt-[60px] px-5 md:px-10 w-full flex flex-center bg-image-2 bg-cover min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" max-w-[800px] w-full flex flex-col items-center gap-2 border-1 bg-light-4 text-black p-5 rounded"
      >
        <h1 className="text-2xl font-bold text-black">
          Create Non-Technical Category for -&gt; {existingEvent?.title}
        </h1>
        {errMessage && <p className="text-red-500">{errMessage}</p>}
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 md:w-1/2">
            <input
              type="text"
              name="event"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter event..."
              value={formData.event}
              onChange={handleChange}
              disabled
            />
            <input
              type="text"
              name="category"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter category..."
              value={formData.category}
              onChange={handleChange}
              disabled
            />
            <input
              type="number"
              name="noOfMembers"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter number of members..."
              value={formData.noOfMembers}
              onChange={handleChange}
            />
            <h2 className="text-xl font-semibold">Participant</h2>
            <input
              type="text"
              name="name"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter name..."
              value={formData.mainParticipant.name}
              onChange={(e) => handleNestedChange(e)}
            />
            <input
              type="text"
              name="branch"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter branch..."
              value={formData.mainParticipant.branch}
              onChange={(e) => handleNestedChange(e)}
            />
            <input
              type="text"
              name="rollNo"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter roll number..."
              value={formData.mainParticipant.rollNo}
              onChange={(e) => handleNestedChange(e)}
            />
            <input
              type="email"
              name="email"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter email..."
              value={formData.mainParticipant.email}
              onChange={(e) => handleNestedChange(e)}
            />
            <input
              type="text"
              name="phoneNumber"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter phone number..."
              value={formData.mainParticipant.phoneNumber}
              onChange={(e) => handleNestedChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2 justify-between md:w-1/2">
            <h2 className="text-xl font-semibold">Co-Participants</h2>
            {formData.coParticipants.map((cp, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
                  placeholder="Enter name..."
                  value={cp.name}
                  onChange={(e) => handleNestedChange(e, index)}
                />
                <input
                  type="text"
                  name="rollNo"
                  className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
                  placeholder="Enter roll number..."
                  value={cp.rollNo}
                  onChange={(e) => handleNestedChange(e, index)}
                />
                <input
                  type="text"
                  name="branch"
                  className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
                  placeholder="Enter branch..."
                  value={cp.branch}
                  onChange={(e) => handleNestedChange(e, index)}
                />
                <button
                  type="button"
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 focus:outline-none self-start"
                  onClick={() => handleRemoveCoParticipant(index)}
                >
                  Remove Co-Participant
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
              onClick={handleAddCoParticipant}
            >
              Add Co-Participant
            </button>
            <input
              type="text"
              name="college"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter college..."
              value={formData.college}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
            />
            <input
              type="text"
              name="danceType"
              className="border-[1.5px] border-slate-500 rounded px-4 py-2 focus:outline-none"
              placeholder="Enter dance type..."
              value={formData.danceType}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex-grow w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 focus:outline-none"
          disabled={isCreating}
        >
          Create Non-Technical Category
        </button>
      </form>
    </div>
  );
};
