import { useDispatch, useSelector } from "react-redux";
import { logout } from "./loggedSlice";  // Corrected path
import { useNavigate } from "react-router";

export default function HomeComp() {
  const mystate = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="container mt-5">        
      <h2>Welcome Home</h2>
      <p>Logged in: {mystate.loggedIn.toString()}</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
