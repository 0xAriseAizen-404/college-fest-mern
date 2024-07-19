import { FaSearch } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { EventCard } from "./admin/components/EventCard";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "../redux/api/eventApiSlice";

export const Events = () => {
  const [searchKey, setSearchKey] = useState("");
  const [originalEventsList, setOriginalEventsList] = useState([]);
  const { data: eventsData, isLoading } = useGetAllEventsQuery();
  const [eventsList, setEventsList] = useState([]);

  const dispatch = useDispatch();

  const [tabCount, setTabCount] = useState(2);
  const [pastEvents, setPastEvents] = useState([]);
  const [onGoingEvents, setOnGoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    if (eventsData) {
      setOriginalEventsList(eventsData);
      setEventsList(eventsData);

      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      setPastEvents(
        eventsData.filter((event) => new Date(event.date) < startOfToday)
      );

      setOnGoingEvents(
        eventsData.filter((event) => {
          const eventStartDate = new Date(event.date);
          const eventEndDate = new Date(event.date);
          eventEndDate.setDate(eventEndDate.getDate() + (event.duration || 1));
          return eventStartDate < endOfToday && eventEndDate > startOfToday;
        })
      );

      setUpcomingEvents(
        eventsData.filter((event) => new Date(event.date) >= endOfToday)
      );
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
          {isLoading ? (
            <BeatLoader size={20} color={"red"} className="mt-5" />
          ) : (
            <div className="flex flex-col w-full mt-5">
              <div className="flex flex-row gap-4 self-center items-center">
                <span
                  className={`font-bold cursor-pointer ${
                    tabCount === 1 ? "bg-primary-600 rounded-sm px-4 py-2" : ""
                  }`}
                  onClick={() => setTabCount(1)}
                >
                  Past Events
                </span>
                <span
                  className={`font-bold cursor-pointer ${
                    tabCount === 2 ? "bg-primary-600 rounded-sm px-4 py-2" : ""
                  }`}
                  onClick={() => setTabCount(2)}
                >
                  OnGoing Events
                </span>
                <span
                  className={`font-bold cursor-pointer ${
                    tabCount === 3 ? "bg-primary-600 rounded-sm px-4 py-2" : ""
                  }`}
                  onClick={() => setTabCount(3)}
                >
                  UpComing Events
                </span>
              </div>
              <div className="mt-5 md:w-full sm:w-5/6 w-7/8 grid md:grid-cols-2 grid-cols-1 md:gap-8 sm:gap-6 gap-4 md:px-15 lg:px-20 xs:text-base text-sm">
                {tabCount === 1 &&
                  (pastEvents.length === 0 ? (
                    <div className="w-full flex items-center self-center">
                      <img
                        src={"./assets/download.jpg"}
                        alt="No ongoing events"
                        className="w-1/2 mix-blend-darken mx-auto"
                      />
                      <h1 className="flex flex-col">
                        <span className="text-3xl font-bold text-red-500">
                          No
                        </span>
                        <span className="text-2xl font-semibold">Events</span>
                      </h1>
                    </div>
                  ) : (
                    pastEvents.map((event) => (
                      <EventCard
                        event={event}
                        key={event._id}
                        setEvents={handleSetEvents}
                        cantShow={true}
                      />
                    ))
                  ))}
                {tabCount === 2 &&
                  (onGoingEvents.length === 0 ? (
                    <div className="w-full flex items-center self-center">
                      <img
                        src={"./assets/download.jpg"}
                        alt="No ongoing events"
                        className="w-1/2 mix-blend-darken mx-auto"
                      />
                      <h1 className="flex flex-col">
                        <span className="text-3xl font-bold text-red-500">
                          No
                        </span>
                        <span className="text-2xl font-semibold">Events</span>
                      </h1>
                    </div>
                  ) : (
                    onGoingEvents.map((event) => (
                      <EventCard
                        event={event}
                        key={event._id}
                        setEvents={handleSetEvents}
                      />
                    ))
                  ))}
                {tabCount === 3 &&
                  (upcomingEvents.length === 0 ? (
                    <div className="w-full flex items-center self-center">
                      <img
                        src={"./assets/download.jpg"}
                        alt="No ongoing events"
                        className="w-1/2 mix-blend-darken mx-auto"
                      />
                      <h1 className="flex flex-col">
                        <span className="text-3xl font-bold text-red-500">
                          No
                        </span>
                        <span className="text-2xl font-semibold">Events</span>
                      </h1>
                    </div>
                  ) : (
                    upcomingEvents.map((event) => (
                      <EventCard
                        event={event}
                        key={event._id}
                        setEvents={handleSetEvents}
                      />
                    ))
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
