import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar";

export const AdminLayout = () => {
  const location = useLocation();
  const adminPath = location.pathname.split("/").pop() !== "login";

  return (
    <main className="min-h-screen w-full bg-light-4">
      {adminPath && <AdminSidebar />}
      <div className={` ${adminPath !== "login" && "md:pl-[15vw] pl-[40px]"}`}>
        <Outlet />
      </div>
    </main>
  );
};
