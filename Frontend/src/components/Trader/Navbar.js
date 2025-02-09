import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  FaHome,
  FaSearch,
  FaWallet,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
  FaFolderOpen,
} from "react-icons/fa"; // Import icons

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/trader">
          <strong>TradeSphere</strong>
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
            <li className="nav-item">
              <Link to="/trader" className="nav-link">
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="searchstock" className="nav-link">
                <FaSearch className="me-2" /> Stock Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to="portfolio" className="nav-link">
                <FaFolderOpen className="me-2" /> Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="viwepost" className="nav-link">
                <FaChartLine className="me-2" /> View Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link to="wallet" className="nav-link">
                <FaWallet className="me-2" /> Wallet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="profile" className="nav-link">
                <FaUser className="me-2" /> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-danger" to="/logout">
                <FaSignOutAlt className="me-2" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
