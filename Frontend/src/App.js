import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
// import WebsiteHome from './components/WebsiteHome';  
import ErrorComp from './components/ErrorComp'; 
import LoginComp from './components/LoginComp';  
import RegisterComp from './components/RegisterComp';  
import HomeComp from './components/HomeComp';  
import ApproveAnalyst from './components/ApproveAnalyst';  
import { useSelector } from 'react-redux';  // Corrected import for Redux
import bullImage from './bull.jpg';

function App() {
  // Accessing loggedIn state from Redux store
  const mystate = useSelector(state => state.logged);

  return (
    <div>
      <header className="App-header">
        {/* Conditional rendering for login/register buttons based on logged state */}
        <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
          <ul class="navbar navbar-expand-lg navbar-light bg-light">
          <img src={bullImage} alt='Logo' />
          <h1 className="navbar-logo"><a>Tradesphere</a></h1>
            <li className="nav-item">
              <Link to="/login" className="nav-link">LOGIN</Link>
            </li>

            <li className="nav-item">
              <Link to="/home" className="nav-link">HOME</Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">ABOUT US </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">CONTACT</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">REGISTER</Link>
            </li>
          </ul>
        </div>

        {/* Routes and Components */}
        <Routes>
          {/* <Route path="/" element={<WebsiteHome />} /> */}
          <Route path="/login" element={<LoginComp />} />
          <Route path="/register" element={<RegisterComp />} />
          <Route path="/home" element={<HomeComp />} />
          <Route path="/approve-analyst" element={<ApproveAnalyst />} />
          <Route path="*" element={<ErrorComp />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
