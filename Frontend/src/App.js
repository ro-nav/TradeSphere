import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./components/redux/loggedSlice";

// Components
import NavbarComp from "./components/Navbar/NavbarComp";
import ErrorComp from "./components/Utils/ErrorComp";
import LoginComp from "./components/Home/LoginComp";
import RegisterComp from "./components/Home/RegisterComp";
import HomeComp from "./components/Home/HomeComp";
import Trader from "./components/Trader/Trader";
import Analyst from "./components/Analyst/Analyst";
import Admin from "./components/Admin/Admin";
import Contact from "./components/Home/ContactComp";
import UserPermissionSection from "./components/Admin/UserPermissionSection";
import AnalystProfile from "./components/Analyst/AnalystProfile";
import Chart from "./components/Utils/Chart";
import TraderProfile from "./components/Trader/TraderProfile";
import Prediction from "./components/Analyst/Prediction";
import LogoutComp from "./components/Home/LogoutComp";
import AboutUs from "./components/Home/AboutUs";
import UpdateProfileComp from "./components/Utils/UpdateProfileComp";
import LoginPage from "./components/Admin/LoginAPI";

function App() {
  const { loggedIn } = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);  // New state to track auth status check

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(login(JSON.parse(userData)));
    }
    setAuthChecked(true);  // Mark auth check as complete
  }, [dispatch]);

  if (!authChecked) {
    // Show a loading indicator until auth check is complete
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Conditionally show Navbar only if user is not logged in */}
      {!loggedIn && <NavbarComp />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/logout" element={<LogoutComp />} />

        {/* Protected Analyst Routes */}
        <Route path="/analyst" element={loggedIn ? <Analyst /> : <Navigate to="/login" />}>
          <Route path="profile" element={<AnalystProfile />} />
          <Route path="chart" element={<Chart />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="updateprofile" element={<UpdateProfileComp />} />
        </Route>

        {/* Protected Trader Routes */}
        <Route path="/trader" element={loggedIn ? <Trader /> : <Navigate to="/login" />}>
          <Route path="profile" element={<TraderProfile />} />
          <Route path="chart" element={<Chart />} />
          <Route path="updateprofile" element={<UpdateProfileComp />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/LoginAPI" element={loggedIn ? <LoginPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={loggedIn ? <Admin /> : <Navigate to="/login" />}>
          <Route path="approveanalyst" element={<UserPermissionSection />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </div>
  );
}

export default App;
