import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEventByIdMutation,
  useGetEventByIdQuery,
} from "../redux/api/eventApiSlice";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange, MdDescription } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EventsCarousel } from "../components/EventsCarousel";
import { TiArrowDownThick, TiArrowRightThick } from "react-icons/ti";
import BeatLoader from "react-spinners/BeatLoader";
import { CategoryCard } from "../components/CategoryCard";
import { useDeleteCategoryByIdMutation } from "../redux/api/categoryApiSlice";
import { useSelector } from "react-redux";

export const EventPage = () => {
  const { eventId } = useParams();
  const {
    data: event,
    refetch,
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId);
  const [tabCount, setTabCount] = useState(1);
  const [technicalCategories, setTechnicalCategories] = useState([]);
  const [nonTechnicalCategories, setNonTechnicalCategories] = useState([]);
  const { adminInfo } = useSelector((state) => state.auth);
  // console.log(adminInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setTechnicalCategories(
        event?.categories.filter((category) => category.isTechnical)
      );
      setNonTechnicalCategories(
        event?.categories.filter((category) => !category.isTechnical)
      );
    }
  }, [event, refetch]);

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryByIdMutation();

  const handleDelete = useCallback(
    async (category) => {
      try {
        const res = await deleteCategory({
          eventId: category?.event,
          categoryId: category?._id,
        }).unwrap();
        toast.success(res.message);
        refetch();

        if (category.isTechnical) {
          setTechnicalCategories((prev) =>
            prev.filter((cat) => cat._id !== category._id)
          );
        } else {
          setNonTechnicalCategories((prev) =>
            prev.filter((cat) => cat._id !== category._id)
          );
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    [deleteCategory, refetch]
  );

  useEffect(() => {
    refetch();
  }, [
    refetch,
    eventId,
    technicalCategories,
    nonTechnicalCategories,
    event?.categories,
    handleDelete,
  ]);

  if (isLoading) {
    return (
      <div className="pt-5">
        <BeatLoader size={25} color={"red"} className="text-center" />
      </div>
    );
  }

  if (error) {
    toast.error(error?.message || error?.data?.message);
    navigate("/admin/events");
  }

  return (
    <div className="p-3 w-full flex flex-col">
      {/* Slider */}
      <EventsCarousel categories={event?.categories} />
      {/* Details */}
      <div className="mt-8 w-full flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-5/6 flex flex-col rounded-lg bg-light-2 shadow-2xl gap-4 p-4">
          <div className="flex items-center gap-4">
            <img
              src={event?.image}
              alt={event?.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold">{event?.title}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <GiTrophy size={20} />
              <span>{event?.title}</span>
            </div>
            <div className="flex gap-2 items-center">
              <MdDateRange size={20} />
              <span>
                {event?.date
                  ? format(new Date(event.date), "dd-MM-yyyy")
                  : "Date Not Available"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationDot size={20} />
              <span>{event?.location}</span>
            </div>
            <div className="flex gap-2 items-center">
              <MdDescription className="self-start flex-shrink-0" size={20} />
              <span>{event?.description}</span>
            </div>
          </div>
        </div>
        {adminInfo && (
          <div className="bg-light-2 shadow-xl rounded-lg p-4 flex justify-end flex-row md:flex-col gap-2 text-center">
            <Link
              to={`/admin/events/${event?._id}/category/categoryForm`}
              className="shadow-xl md:mb-auto md:mr-0 mr-auto p-2 px-4 bg-secondary-600 hover:bg-secondary-500 text-white text-sm rounded"
            >
              Create Category
            </Link>
            <Link
              to={`/admin/events/eventForm/${event?._id}`}
              className="shadow-xl p-2 px-4 bg-green-600 hover:bg-green-800 text-white text-sm rounded"
            >
              Update
            </Link>
            <button
              className="shadow-xl p-2 px-4 bg-red-600 hover:bg-red-800 text-white text-sm rounded"
              onClick={() => handleDelete(event?._id)}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
      {/* Categories */}
      <div className="flex flex-row gap-4 self-center items-center mt-5">
        <span
          className={`font-bold cursor-pointer ${
            tabCount === 1 ? "bg-primary-600 rounded-sm px-4 py-2" : ""
          }`}
          onClick={() => setTabCount(1)}
        >
          Technical Categories
        </span>
        <span
          className={`font-bold cursor-pointer ${
            tabCount === 2 ? "bg-primary-600 rounded-sm px-4 py-2" : ""
          }`}
          onClick={() => setTabCount(2)}
        >
          Non-Technical Categories
        </span>
      </div>
      <div className="mt-5 md:w-full sm:w-5/6 w-7/8 grid grid-cols-1 md:gap-8 sm:gap-6 gap-4 md:px-15 lg:px-20 xs:text-base text-sm">
        {tabCount === 1 &&
          (technicalCategories.length === 0 ? (
            <div className="w-full flex items-center self-center">
              <img
                src={"./assets/download.jpg"}
                alt="No Technical Category"
                className="w-1/2 mix-blend-darken mx-auto"
              />
              <h1 className="flex flex-col">
                <span className="text-3xl font-bold text-red-500">No</span>
                <span className="text-2xl font-semibold">Events</span>
              </h1>
            </div>
          ) : (
            technicalCategories.map((category) => (
              <CategoryCard
                category={category}
                key={category._id}
                handleDelete={handleDelete}
                adminInfo={adminInfo}
              />
            ))
          ))}
        {tabCount === 2 &&
          (nonTechnicalCategories.length === 0 ? (
            <div className="w-full flex items-center self-center">
              <img
                src={"./assets/download.jpg"}
                alt="No Non-Technical Category"
                className="w-1/2 mix-blend-darken mx-auto"
              />
              <h1 className="flex flex-col">
                <span className="text-3xl font-bold text-red-500">No</span>
                <span className="text-2xl font-semibold">Events</span>
              </h1>
            </div>
          ) : (
            nonTechnicalCategories.map((category) => (
              <CategoryCard
                category={category}
                key={category._id}
                handleDelete={handleDelete}
                adminInfo={adminInfo}
              />
            ))
          ))}
      </div>
    </div>
  );
};
