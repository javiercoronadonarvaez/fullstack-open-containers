import { BrowserRouter as Router, useMatch } from "react-router-dom";

const User = ({ users }) => {
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  console.log(user);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Added Blogs</p>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default User;
