import { Outlet } from "react-router-dom";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full">
        <Outlet />
      </main>
    </>
  );
};

export default App;
