import { Outlet } from "react-router-dom";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <>
      <main className="min-h-screen w-full">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default App;
