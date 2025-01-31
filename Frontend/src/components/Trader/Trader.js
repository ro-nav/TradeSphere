import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComp from "./Navbar/navbar";

export default function Trader() {
  const location = useLocation();
  const username = location.state?.username || "";

  // State to toggle profile sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showChart, setShowChart] = useState(false); // State to toggle chart visibility
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing localStorage, resetting state, etc.)
    navigate("/login", { state: { navbar: true } }); // Redirect to Home page
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div>*********
        {<NavbarComp/>}
      </div>

      
      {/* Content */}
      <div className="text-center mt-5">
        {!showChart && <h2>Happy Trading, {username}!</h2>}
        <Outlet />
      </div>
    </div>
  );
}
