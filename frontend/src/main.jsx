import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Home } from "./pages/user/Home.jsx";
import { Events as EventsPage } from "./pages/user/Events.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./pages/admin/AdminLayout.jsx";
import { AdminLogin } from "./pages/admin/auth/AdminLogin.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { DashBoard } from "./pages/admin/DashBoard.jsx";
import { Alladmins } from "./pages/admin/Alladmins.jsx";
import { Events } from "./pages/admin/Events.jsx";
import { Participants } from "./pages/admin/Participants.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="all-admins" element={<Alladmins />} />
            <Route path="events" element={<Events />} />
            <Route path="participants" element={<Participants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
