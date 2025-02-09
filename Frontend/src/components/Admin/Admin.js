import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserPermissionSection from "./UserPermissionSection";
import UpdateStock from "./UpdateStocksComp";
import ManageStocks from "./DeleteStockComp";
import ManageAnalysis from "./ManageAnalysisComp";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HomeIcon from "@mui/icons-material/Home";
import "./Admin.css";

export default function Admin() {
  const location = useLocation();
  const username = location.state?.username || "";
  const [view, setView] = useState("dashboard");

  const handleHomeClick = () => {
    setView("dashboard");
  };

  return (
    <div className="admin-container">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <span
            className="navbar-brand text-white"
            style={{ cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            <HomeIcon className="me-2" /> Tradesphere Admin
          </span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  onClick={() => setView("manageUsers")}
                  className="nav-link nav-link-custom btn"
                >
                  <GroupIcon className="me-1" /> Manage Analyst
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setView("updateStocks")}
                  className="nav-link nav-link-custom btn"
                >
                  <AddCircleIcon className="me-1" /> Add Stocks
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setView("deleteStocks")}
                  className="nav-link nav-link-custom btn"
                >
                  <DeleteIcon className="me-1" /> Delete Stocks
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setView("manageAnalysis")}
                  className="nav-link nav-link-custom btn"
                >
                  <AssessmentIcon className="me-1" /> Analyst Posts
                </button>
              </li>
            </ul>
          </div>
          <Link
            to="/logout"
            className="nav-link nav-link-custom btn"
            style={{
              backgroundColor: "#e53935", // Red color for logout
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 15px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
          >
            <LogoutIcon className="me-1" /> LOGOUT
          </Link>
        </div>
      </nav>

      <div className="card-content">
        {view === "dashboard" && <h2>Welcome, Admin {username}!</h2>}
        {view === "manageUsers" && (
          <div className="mt-4">
            <h3>User Management</h3>
            <UserPermissionSection />
          </div>
        )}
        {view === "updateStocks" && (
          <div className="mt-4">
            <h3>Update Stocks</h3>
            <UpdateStock />
          </div>
        )}
        {view === "deleteStocks" && (
          <div className="mt-4">
            <h3>Manage Stocks</h3>
            <ManageStocks />
          </div>
        )}
        {view === "manageAnalysis" && (
          <div className="mt-4">
            <h3>Manage Analyst Posts</h3>
            <ManageAnalysis />
          </div>
        )}
      </div>
    </div>
  );
}
