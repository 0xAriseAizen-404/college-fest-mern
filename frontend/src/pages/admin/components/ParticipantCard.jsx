const ParticipantCard = ({ participant, index }) => {
  // console.log(participant);
  const { mainParticipant } = participant;

  if (!mainParticipant) {
    return null; // or display some placeholder
  }

  return (
    <div className="flex flex-col w-full rounded bg-white text-black p-2">
      <div className="flex flex-col gap-2 p-2 bg-light-2">
        <h1 className="text-2xl font-bold">Event : {participant?.event}</h1>
        <h1 className="text-xl font-semibold">
          Category : {participant?.category}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Main Participant : </h1>
          <h1 className="text-sm">Name: {mainParticipant?.name}</h1>
          <h1 className="text-sm">RollNo: {mainParticipant?.rollNo}</h1>
          <h1 className="text-sm">Branch: {mainParticipant?.branch}</h1>
          <h1 className="text-sm">Email: {mainParticipant?.email}</h1>
          <h1 className="text-sm">Phone: {mainParticipant?.phoneNumber}</h1>
        </div>
        <div className="flex flex-col flex-wrap">
          <h1 className="text-base font-semibold">CoParticipants</h1>
          {participant?.coParticipants.map((participant, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="text-sm">RollNo: {participant?.rollNo}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
