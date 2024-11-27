import { useContext } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const LoggedInUser = () => {
  const [user, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    userDispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LoggedInUser;
