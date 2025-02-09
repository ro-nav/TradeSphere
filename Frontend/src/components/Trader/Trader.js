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
      {location.pathname === "/trader" && (
        <div className="header text-white text-center py-5">
          <h1>Welcome, {username}!</h1>
          <p>Manage your portfolio and explore trading opportunities.</p>
        </div>
      )}

      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* Profile Sidebar Card */}
          {isSidebarOpen && (
            <div className="col-md-4 mb-4">
              <div className="card profile-card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Profile Details</h5>
                  <p className="card-text">
                    <strong>Username:</strong> {username}
                  </p>
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Card */}
          <div className={isSidebarOpen ? "col-md-8" : "col-md-12"}>
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
