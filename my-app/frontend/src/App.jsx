import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./requests";
import { getUsers } from "./requests";
import { setToken } from "./requests";
import { useContext } from "react";
import { NotificationContextProvider } from "./components/NotificationContext";
import { ErrorContextProvider } from "./components/ErrorContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogsPerUserTable from "./components/BlogsPerUserTable";
import Menu from "./components/Menu";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  if (blogsResult.isLoading || usersResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;
  console.log("Blogs", blogs);

  const loggedInUserStarter = () => {
    return (
      <div>
        <NotificationContextProvider>
          <Notification />
          <BlogForm />
        </NotificationContextProvider>
        <BlogList blogs={blogs} />
      </div>
    );
  };

  return (
    <div className="container">
      <ErrorContextProvider>
        <Error />
        <Menu user={user} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={loggedInUserStarter()} />
              <Route path="/blogs" element={loggedInUserStarter()} />
              <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
              <Route
                path="/users"
                element={<BlogsPerUserTable users={users} />}
              />
              <Route path="/users/:id" element={<User users={users} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginForm />} />
              <Route path="/blogs" element={<LoginForm />} />
              <Route path="/users" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
            </>
          )}
        </Routes>
      </ErrorContextProvider>
    </div>
  );
};

export default App;
