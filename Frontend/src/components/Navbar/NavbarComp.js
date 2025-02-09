import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login"; // Login icon
import InfoIcon from "@mui/icons-material/Info"; // About Us icon
import ContactMailIcon from "@mui/icons-material/ContactMail"; // Contact icon
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Register icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import bullImage from "../../bull.jpg"; // Ensure correct path to image
import "./Navbar.css"; // Updated styles imported

export default function NavbarComp() {
  const { loggedIn } = useSelector((state) => state.logged);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        {/* Logo section */}
        <Link to="/" className="navbar-brand">
          <img src={bullImage} alt="Logo" className="navbar-logo-img me-2" />
          Tradesphere
        </Link>

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
            {loggedIn ? (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <LogoutIcon className="me-1" /> LOGOUT
                </Link>
              </li>
            ) : (
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
