import { FaSearch } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { EventCard } from "./components/EventCard";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "../../redux/api/eventApiSlice";

export const Events = () => {
  const [searchKey, setSearchKey] = useState("");
  const [originalEventsList, setOriginalEventsList] = useState([]);
  const { data: eventsData, isLoading } = useGetAllEventsQuery();
  const [eventsList, setEventsList] = useState([]);
  const { adminInfo } = useSelector((state) => state.auth);
  // console.log(adminInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (eventsData) {
      setOriginalEventsList(eventsData);
      setEventsList(eventsData);
    }
  }, [eventsData, dispatch]);

  const handleSetEvents = (updateFn) => {
    setEventsList((prevEvents) => {
      const updatedEvents = updateFn(prevEvents);
      setOriginalEventsList(updatedEvents);
      return updatedEvents;
    });
  };

  const handleChangeKey = (key) => {
    setSearchKey(key);
    if (key === "") {
      setEventsList(originalEventsList);
    } else {
      setEventsList(
        originalEventsList.filter((item) =>
          item.title.toLowerCase().includes(key.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h1 className="text-3xl font-bold mb-5">Event Management</h1>
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-between items-center gap-2 md:gap-4 xs:px-4 sm:px-6 md:px-15 lg:px-20">
            <div className="flex flex-grow bg-white px-4 py-3 border-[1.5px] border-slate-500 shadow-md rounded-md">
              <input
                type="text"
                className="focus:outline-none w-full text-base bg-light-1"
                placeholder="Enter Event name"
                onChange={(e) => handleChangeKey(e.target.value)}
                value={searchKey}
              />
              <FaSearch size={20} className="cursor-pointer" />
            </div>
            <Link
              to={"/admin/events/eventForm"}
              className={`text-sm md:text-base text-white font-bold bg-secondary-600 hover:bg-secondary-500 px-4 rounded py-2 xs:py-4 flex flex-center gap-2`}
            >
              <IoIosCreate size={20} />
              New Event
            </Link>
          </div>
          {isLoading ? (
            <BeatLoader size={20} color={"red"} className="mt-5" />
          ) : (
            <div className="mt-5 md:w-full sm:w-5/6 w-7/8 grid md:grid-cols-2 grid-cols-1 md:gap-8 sm:gap-6 gap-4 md:px-15 lg:px-20 xs:text-base text-sm">
              {eventsList.map((event) => (
                <EventCard
                  event={event}
                  key={event._id}
                  setEvents={handleSetEvents}
                  adminInfo={adminInfo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
