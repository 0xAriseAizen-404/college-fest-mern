import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Home } from "./pages/Home.jsx";
import { Events } from "./pages/Events.jsx";
import { AdminLogin } from "./pages/AdminLogin.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
