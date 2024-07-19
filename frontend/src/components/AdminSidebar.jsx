import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../redux/features/auth/authSlice";
import { useLogOutAdminMutation } from "../redux/api/adminApiSlice";
import { setCurrAdmin } from "../redux/features/admin/adminSlice";
import { toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";

export const AdminSidebar = () => {
  const adminInfo = useSelector((state) => state.auth);
  const [showSideBar, setSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutAdmin] = useLogOutAdminMutation();

  const logOutHandler = async () => {
    try {
      const res = await logOutAdmin();
      // console.log(res); // Log the response
      dispatch(logout());
      dispatch(setCurrAdmin(null));
      toast.success(res.data.message); // Ensure this is correct
      navigate("/");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div
      style={{ zIndex: 999, transition: "all 300ms ease-in" }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } lg:flex flex-col text-white md:w-[15vw] w-[40px] md:pl-6 pl-1 py-5 pr-1 xs:pr-0 bg-bg-100 h-screen fixed`}
      id="navigation-container"
    >
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 mb-8 ${
            isActive ? "text-primary-100" : ""
          } text-sm sm:text-lg`
        }
      >
        <MdDashboard size={20} className="md:hidden block" />
        <span className="md:text-sm lg:text-xl font-semibold uppercase md:block hidden truncate">
          Dashboard
        </span>
      </NavLink>

      <div className="flex flex-col justify-center space-y-2">
        <NavLink
          to="/admin/all-admins"
          className={({ isActive }) =>
            `flex items-center gap-2  p-2 md:p-3 transition-all duration-300 ease-in-out transform  ${
              isActive &&
              "xs:rounded-s-full xs:rounded-e-none bg-primary-200 rounded-full"
            }`
          }
        >
          <FaUser size={20} />
          <span className="text-sm hidden md:block">Admins</span>
        </NavLink>
        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 md:p-3 transition-all duration-300 ease-in-out transform  ${
              isActive &&
              "xs:rounded-s-full xs:rounded-e-none bg-primary-200 rounded-full"
            }`
          }
        >
          <MdEvent size={20} />
          <span className="text-sm hidden md:block">Events</span>
        </NavLink>
        <NavLink
          to="/admin/participants"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 md:p-3 transition-all duration-300 ease-in-out transform  ${
              isActive &&
              "xs:rounded-s-full xs:rounded-e-none bg-primary-200 rounded-full"
            }`
          }
        >
          <IoIosPerson size={20} />
          <span className="text-sm hidden md:block truncate">Participants</span>
        </NavLink>
      </div>

      <div className="mt-auto justify-self-end">
        <NavLink
          to="/"
          className="pl-4 flex items-center gap-2 transition-transform transform hover:translate-x-2  relative"
          onClick={logOutHandler}
        >
          <LuLogOut size={20} />
          <span className="text-sm hidden md:block">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};
