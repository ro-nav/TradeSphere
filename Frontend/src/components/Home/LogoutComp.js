import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/loggedSlice";

export default function LogoutComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch logout action
    dispatch(logout());

    // Clear local storage
    localStorage.clear();
    sessionStorage.removeItem("userInfo");
    // or for localStorage
    localStorage.removeItem("userInfo");

    // Navigate to home page
    navigate("/");
  }, [dispatch, navigate]);

  return null; // Optional: Display a loader or message if needed
}
