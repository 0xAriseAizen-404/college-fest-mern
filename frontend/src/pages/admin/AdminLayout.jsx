import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar";

export const AdminLayout = () => {
  const location = useLocation();

  return (
    <main className="min-h-screen w-full bg-light-4">
      {location.pathname.split("/").pop() !== "login" && <AdminSidebar />}
      <div className="md:pl-[15vw] pl-[40px]">
        <Outlet />
      </div>
    </main>
  );
};
