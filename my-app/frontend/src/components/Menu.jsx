import { BrowserRouter as Router, Link } from "react-router-dom";
import LoggedInUser from "./LoggedInUser";

const Menu = ({ user }) => {
  if (user) {
    return (
      <div>
        <Link to="/blogs" className="menu">
          blogs
        </Link>
        <Link to="/users" className="menu">
          users
        </Link>
        <LoggedInUser />
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/blogs" className="menu">
          notes
        </Link>
        <Link to="/users" className="menu">
          users
        </Link>
        <Link to="/login" className="menu">
          login
        </Link>
      </div>
    );
  }
};

export default Menu;
