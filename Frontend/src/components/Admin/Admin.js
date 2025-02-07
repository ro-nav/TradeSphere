import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPermissionSection from "./UserPermissionSection";
import UpdateStock from "./UpdateStocksComp"; // Import UpdateStock component
import LogoutIcon from "@mui/icons-material/Logout";

export default function Admin() {
  const location = useLocation();
  const username = location.state?.username || "";
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("dashboard"); // New state to manage views

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleManageUsers = () => {
    setView("manageUsers");
  };

  const handleUpdateStocks = () => {
    setView("updateStocks");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Tradesphere
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button onClick={handleManageUsers} className="nav-link btn">
                  Manage Users
                </button>
              </li>
              <li className="nav-item">
                <button onClick={handleUpdateStocks} className="nav-link btn">
                  Update Stocks
                </button>
              </li>
            </ul>
          </div>
          <Link to="/logout" className="nav-link">
            <LogoutIcon className="me-1" /> LOGOUT
          </Link>
        </div>
      </nav>

      <div className="mt-5">
        {view === "dashboard" && (
          <h2 className="text-center">Welcome, Admin {username}!</h2>
        )}
        {view === "manageUsers" && (
          <div className="mt-4">
            <h3>User Management</h3>
            <UserPermissionSection />
          </div>
        )}
        {view === "updateStocks" && (
          <div className="mt-4">
            <UpdateStock />
          </div>
        )}
      </div>
    </div>
  );
}
