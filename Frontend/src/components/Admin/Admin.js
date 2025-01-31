import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPermissionSection from "./UserPermissionSection";

export default function Admin() {
  const location = useLocation();
  const username = location.state?.username || "";
  const navigate = useNavigate(); // Hook for navigation

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    navigate("/login"); // Redirect to the Login page
  };

  return (
    <div className="container">
      {/* Navbar */}
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
                <Link to="/portfolio" className="nav-link">
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={toggleSidebar} className="nav-link btn">
                  Profile
                </button>
              </li>
            </ul>
          </div>
          {/* Logout Button */}
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>

      {/* Profile Sidebar */}
      {isSidebarOpen && (
        <div className="profile-sidebar active">
          <ul className="sidebar-menu">
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="text-center mt-5">
        <h2>Welcome, Admin {username}!</h2>
      </div>

      {/* User Permission Section */}
      <UserPermissionSection />
    </div>
  );
}
