import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import ParticipantCard from "./admin/components/ParticipantCard";

export const ViewParticipants = () => {
  const { eventId, categoryId } = useParams();
  const { data: category } = useGetCategoryByIdQuery({ eventId, categoryId });
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    if (category) {
      if (category.isTechnical) {
        setParticipants(category.techParticipants);
      } else {
        setParticipants(category.nonTechParticipants);
      }
    }
  }, [category]);
  return (
    <div className="p-4">
      <span className="text-xl font-bold">All the participants in -&gt; </span>
      <span className="text-2xl font-bold">{category?.title} Category</span>
      <div className="grid md:grid-cols-2 grid-cols-1 ">
        {/* {console.log(Array.from(participants))} */}
        {participants.map((participant, index) => (
          <ParticipantCard
            key={participant._id}
            participant={participant}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
