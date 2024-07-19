import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Home } from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./pages/admin/AdminLayout.jsx";
import { AdminLogin } from "./pages/admin/auth/AdminLogin.jsx";
import { EventPage } from "./pages/EventPage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { DashBoard } from "./pages/admin/DashBoard.jsx";
import { Alladmins } from "./pages/admin/Alladmins.jsx";
import { Events } from "./pages/Events.jsx";
import { Events as AdminEvents } from "./pages/admin/Events.jsx";
import { Participants } from "./pages/admin/Participants.jsx";
import { EventForm } from "./pages/admin/forms/EventForm.jsx";
import { CategoryForm } from "./pages/admin/forms/CategoryForm.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TechForm } from "./pages/admin/forms/TechForm.jsx";
import { NonTechForm } from "./pages/admin/forms/NonTechForm.jsx";
import { ViewParticipants } from "./pages/ViewParticipants.jsx";

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
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventPage />} />
            <Route
              path="/events/:eventId/:categoryId/techForm"
              element={<TechForm />}
            />
            <Route
              path="/events/:eventId/:categoryId/nonTechForm"
              element={<NonTechForm />}
            />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="all-admins" element={<Alladmins />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/:eventId" element={<EventPage />} />
            <Route
              path="events/:eventId/:categoryId"
              element={<ViewParticipants />}
            />
            <Route path="participants" element={<Participants />} />
            <Route path="events/eventForm" element={<EventForm />} />
            <Route path="events/eventForm/:eventId" element={<EventForm />} />
            <Route
              path="events/:eventId/category/categoryForm"
              element={<CategoryForm />}
            />
            <Route
              path="events/:eventId/category/categoryForm/:categoryId"
              element={<CategoryForm />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
