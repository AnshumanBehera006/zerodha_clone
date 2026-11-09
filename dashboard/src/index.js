import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

// ─── Set Axios Defaults ──────────────────────────────────────────────────
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:3002";
axios.defaults.withCredentials = true;

// ─── Axios Interceptors (401 Redirect) ───────────────────────────────────
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const frontendUrl =
        process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
      window.location.href = `${frontendUrl}/login`;
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
