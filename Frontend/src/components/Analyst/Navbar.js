import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Tradesphere <HomeIcon />
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
              <Link to="" className="nav-link">
                <HomeIcon /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="profile" className="nav-link">
                <AccountCircleIcon /> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="prediction" className="nav-link">
                <InsightsIcon /> Analyze
              </Link>
            </li>
          </ul>
        </div>
        {/* Logout Button */}
        <Link className="btn btn-danger" to="/logout">
          <LogoutIcon /> Logout
        </Link>
      </div>
    </nav>
  );
}
