import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Trader.css";
import Navbar from "./Navbar";

export default function Trader() {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const username = userInfo.username || "User";
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    navigate("/login", { state: { navbar: true } });
  };

  return (
    <div className="trader-page">
      {/* Navbar */}
      <Navbar />

      {/* Header with Gradient Background */}
      {/* {location.pathname === "/trader" && (
        <div className="header text-white text-center py-5">
          <h1>Welcome, {username}!</h1>
          <p>Manage your portfolio and explore trading opportunities.</p>
        </div>
      )} */}

      <div className="mt-4 mb-4">
        <div className="row justify-content-center">
          {/* Main Content Card */}
          <div className="col-md-12">
            <div className="card content-card shadow-lg">
              <div className="card-body">
                {location.pathname === "/trader" && (
                  <h2 className="welcome-message text-center">
                    Happy Trading, {username}!
                  </h2>
                )}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
