import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPermissionSection from "./UserPermissionSection";
import UpdateStock from "./UpdateStocksComp";
import ManageStocks from "./DeleteStockComp"; // Import ManageStocks component
import LogoutIcon from "@mui/icons-material/Logout";

export default function Admin() {
  const location = useLocation();
  const username = location.state?.username || "";
  const navigate = useNavigate();

  const [view, setView] = useState("dashboard");

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
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button onClick={() => setView("manageUsers")} className="nav-link btn">
                  Manage Users
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setView("updateStocks")} className="nav-link btn">
                  Add Stocks
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setView("deleteStocks")} className="nav-link btn">
                  Delete Stocks
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
        {view === "deleteStocks" && (
          <div className="mt-4">
            <ManageStocks />
          </div>
        )}
      </div>
    </div>
  );
}
