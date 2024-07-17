import { Outlet } from "react-router-dom";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <main className="min-h-screen w-full">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default App;
