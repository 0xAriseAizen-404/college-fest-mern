import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllParticipantsQuery } from "../../redux/api/eventApiSlice";
import ParticipantCard from "./components/ParticipantCard";

export const Participants = () => {
  const navigate = useNavigate();
  const {
    data: participants = [],
    isLoading,
    isError,
  } = useGetAllParticipantsQuery();
  console.log(participants);

  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (participants.length > 0) {
      let filteredList = [...participants]; // Create a copy of participants array

      if (searchTerm) {
        filteredList = filteredList.filter((participant) => {
          const lowercasedTerm = searchTerm.toLowerCase();
          return (
            participant.mainParticipant?.name
              ?.toLowerCase()
              .includes(lowercasedTerm) ||
            participant.mainParticipant?.branch
              ?.toLowerCase()
              .includes(lowercasedTerm) ||
            participant.mainParticipant?.rollNo
              ?.toLowerCase()
              .includes(lowercasedTerm)
          );
        });
      }

      if (sortBy) {
        filteredList.sort((a, b) => {
          if (sortBy === "name") {
            return sortOrder === "asc"
              ? a.mainParticipant.name.localeCompare(b.mainParticipant.name)
              : b.mainParticipant.name.localeCompare(a.mainParticipant.name);
          } else if (sortBy === "branch") {
            return sortOrder === "asc"
              ? a.mainParticipant.branch.localeCompare(b.mainParticipant.branch)
              : b.mainParticipant.branch.localeCompare(
                  a.mainParticipant.branch
                );
          } else if (sortBy === "rollNo") {
            return sortOrder === "asc"
              ? a.mainParticipant.rollNo.localeCompare(b.mainParticipant.rollNo)
              : b.mainParticipant.rollNo.localeCompare(
                  a.mainParticipant.rollNo
                );
          }
        });
      }

      setFilteredParticipants(filteredList);
    }
  }, [participants, searchTerm, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading participants.</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Participants List</h2>
      <div className="w-4/6">
        <input
          type="search"
          className="shad-input w-full"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
        />
      </div>
      <div className="w-4/6 flex justify-between">
        <div>
          <label>Sort by: </label>
          <select value={sortBy} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="branch">Branch</option>
            <option value="rollNo">Roll No</option>
          </select>
        </div>
        <div>
          <label>Order: </label>
          <select value={sortOrder} onChange={handleSortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
        {filteredParticipants.map((participant, index) => (
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
