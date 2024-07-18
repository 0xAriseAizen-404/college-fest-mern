import { FaSearch } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { useGetAllEventsQuery } from "../../redux/api/eventApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoIosCreate } from "react-icons/io";
import { setEvents } from "../../redux/features/event/eventSlice";
import { EventCard } from "./components/EventCard";
import { Link } from "react-router-dom";

export const Events = () => {
  const [openForm, setOpenForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { events } = useSelector((state) => state.events);
  const [originalEventsList, setOriginalEventsList] = useState([]);
  const [eventsList, setEventsList] = useState(events);
  const {
    data: eventsData,
    refetch,
    isLoading,
    error,
  } = useGetAllEventsQuery();

  const { currentAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsData) {
      setOriginalEventsList(eventsData);
      setEventsList(eventsData);
      dispatch(setEvents(eventsData));
    }
  }, [eventsData, dispatch]);

  const handleSetEvents = (updateFn) => {
    setEventsList((prevEvents) => {
      const updatedEvents = updateFn(prevEvents);
      dispatch(setEvents(updatedEvents));
      return updatedEvents;
    });
  };

  const handleChangeKey = (key) => {
    setSearchKey(key);
    if (key === "") {
      setEventsList(setOriginalEventsList);
    } else {
      setEventsList(
        originalEventsList.filter((item) =>
          item.username.toLowerCase().includes(key.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h1 className="text-3xl font-bold mb-5">Event Management</h1>
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-between items-center gap-2 md:gap-4 md:px-15 lg:px-20">
            <div className="flex flex-grow bg-white px-4 py-3 border-[1.5px] border-slate-500 shadow-md rounded-md">
              <input
                type="text"
                className="focus:outline-none w-full text-base"
                placeholder="Enter Admin name"
                onChange={(e) => handleChangeKey(e.target.value)}
                value={searchKey}
              />
              <FaSearch size={20} className="cursor-pointer" />
            </div>
            <Link
              to={"/admin/events/eventForm"}
              className={`text-sm md:text-base text-white font-bold bg-[#5f8aff] hover:bg-[#4070F9] px-4 rounded py-2 xs:py-4 flex flex-center gap-2`}
            >
              <IoIosCreate size={20} />
              New Event
            </Link>
          </div>
          {isLoading ? (
            <BeatLoader size={20} color={"red"} />
          ) : (
            <div className="mt-5 w-full grid md:grid-cols-2 grid-cols-1 md:gap-8 sm:gap-6 gap-4 md:px-15 lg:px-20 xs:text-base text-sm">
              {eventsList?.map((event) => (
                <EventCard
                  event={event}
                  key={event._id}
                  setEvents={handleSetEvents}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
