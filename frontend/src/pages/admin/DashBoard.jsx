import { useGetAllEventsQuery } from "../../redux/api/eventApiSlice";
import { useGetAllParticipantsQuery } from "../../redux/api/eventApiSlice";
import { useGetAllQuery } from "../../redux/api/categoryApiSlice";
import CountUp from "react-countup";

export const DashBoard = () => {
  const { data: events } = useGetAllEventsQuery();
  const { data: participants } = useGetAllParticipantsQuery();
  const { data: categories } = useGetAllQuery();
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-3xl font-bold">College Fest Dashboard</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="text-xl font-bold mb-4">Total Events</div>
          <CountUp end={events?.length} className="text-xl font-bold" />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="text-xl font-bold mb-4">Total Participants</div>
          <CountUp end={participants?.length} className="text-xl font-bold" />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="text-xl font-bold mb-4">Total Categories</div>
          <CountUp end={categories?.length} className="text-xl font-bold" />
        </div>
      </div>
    </div>
  );
};
