import { BiTrophy } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { FaTrophy } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const CategoryCard = ({ category, handleDelete, adminInfo }) => {
  const participantsCount = () => {
    if (category?.isTechnical) return category?.techParticipants?.length || 0;
    return category?.nonTechParticipants?.length || 0;
  };

  // const now = new Date();
  // const startOfToday = new Date(
  //   now.getFullYear(),
  //   now.getMonth(),
  //   now.getDate()
  // );
  // const canShow = new Date(category.date)  startOfToday;
  // console.log(canShow);

  return (
    <div className="flex flex-row bg-light-1 shadow-xl gap-2">
      <img
        src={category?.image}
        alt={category?.title}
        className="w-3/6 object-cover"
      />
      <div className="flex flex-col gap-2 w-2/3 p-4">
        <h1 className="text-2xl font-bold">{category?.title}</h1>
        <p className="text-sm text-slate-800">
          {category?.description.substring(0, 150)}...
        </p>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="text-md flex w-full items-center gap-2">
            <FaPeopleGroup />
            Members {"->"}{" "}
          </div>
          <p className="text-sm">Min: {category?.minimum}</p>
          <p className="text-sm">Max: {category?.maximum}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-grow text-md">Prizes {"->"} </div>
          <p className="text-sm flex items-center gap-2">
            <FaTrophy />
            Prize 1: {category?.prizes.price1}
          </p>
          <p className="text-sm flex items-center gap-2">
            <GoTrophy />
            Prize 2: {category?.prizes.price2}
          </p>
          <p className="text-sm flex items-center gap-2">
            <BiTrophy />
            Prize 3: {category?.prizes.price3}
          </p>
        </div>
        <p className="text-sm  flex items-center gap-2">
          <MdOutlineTimer />
          Duration: {category?.duration}mins
        </p>
        <p className="text-sm">
          Participants Registered: {participantsCount()}
        </p>
        <div className="flex flex-row gap-2">
          {adminInfo && (
            <>
              <Link
                to={`category/categoryForm/${category?._id}`}
                className="p-2 bg-green-600 hover:bg-green-800 text-white text-sm rounded"
              >
                Update
              </Link>
              <Link
                className="p-2 bg-red-600 hover:bg-red-800 text-white text-sm rounded"
                onClick={() => handleDelete(category?._id)}
              >
                Delete
              </Link>
              <Link
                className="p-2 bg-secondary-600 hover:bg-secondary-500 text-white text-sm rounded"
                to={`${category._id}`}
              >
                View Participants
              </Link>
            </>
          )}
          {!adminInfo && (
            <Link
              to={`${
                category.isTechnical
                  ? `${category?._id}/techForm`
                  : `${category?._id}/nonTechForm`
              }`}
              className="p-2 bg-green-600 hover:bg-green-800 text-white text-sm rounded"
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
