import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import bullImage from "../../bull.jpg"; // Ensure correct path to image
import "./Navbar.css"; // Ensure this file exists and contains styles

export default function NavbarComp() {
  // Get the logged-in status from Redux state
  const { loggedIn } = useSelector((state) => state.logged);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        {/* Logo section */}
        <img src={bullImage} alt="Logo" className="navbar-logo-img me-2" />
        <h1 className="navbar-logo">
          <Link to="/" className="navbar-brand">
            Tradesphere
          </Link>
        </h1>

        {/* Navbar toggle for mobile */}
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

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Show Logout if logged in */}
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    <LogoutIcon className="me-1" /> LOGOUT
                  </Link>
                </li>
              </>
            ) : (
              // Show Login/Register if not logged in
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <LoginIcon className="me-1" /> LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <PersonAddIcon className="me-1" /> REGISTER
                  </Link>
                </li>
              </>
            )}
            
            {/* Static Links */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <InfoIcon className="me-1" /> ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                <ContactMailIcon className="me-1" /> CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
