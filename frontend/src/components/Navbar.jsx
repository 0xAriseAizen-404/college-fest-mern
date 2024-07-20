import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div
      style={{ zIndex: 99 }}
      className="fixed top-0 w-full px-8 bg-dark-4 flex justify-between"
    >
      <Link to="/" className="sm:w-[10rem] w-[8rem]">
        <img
          src="./assets/rvr-logo.jpg"
          alt="rvr-logo"
          className="object-contain mix-blend-color-dodge"
        />
      </Link>
      <div className="flex flex-center gap-4">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-primary-600 text-sm xs:text-lg  font-bold"
              : "text-sm sm:text-lg text-white font-bold"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/admin/login"
          className={({ isActive }) =>
            isActive
              ? "text-primary-600 text-sm xs:text-lg  font-bold"
              : "text-sm sm:text-lg text-white font-bold"
          }
        >
          Admin
        </NavLink>
      </div>
    </div>
  );
};
