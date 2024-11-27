import { useState } from "react";
import { useField } from "../hooks";
import { useUserValue } from "./UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog, deleteBlog, postBlogComment } from "../requests";
import {
  BrowserRouter as Router,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";

const Blog = ({ blogs }) => {
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const navigate = useNavigate();

  const user = useUserValue();
  const [display, setDisplay] = useState(false);
  const handleDisplayButton = () => {
    setDisplay(!display);
  };

  const queryClient = useQueryClient();
  const incrementBlogLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const incrementBlogLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    incrementBlogLikeMutation.mutate(updatedBlog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id);
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      {
        navigate("/");
        deleteBlogMutation.mutate(blog);
      }
    }
  };

  const comment = useField("text");

  const postCommentMutation = useMutation({
    mutationFn: postBlogComment,
    onSuccess: (updatedBlog) => {
      console.log(updatedBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const handleCommentPosting = (event) => {
    console.log(comment.input.value);
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment.input.value),
    };
    console.log("Updated Blog", updatedBlog);
    postCommentMutation.mutate(updatedBlog);
    comment.reset();
  };

  const showAll = { display: display ? "" : "none" };
  const showLimited = { display: display ? "none" : "" };
  const showDeleteButton = {
    display: blog.user.id === user.id ? "" : "none",
  };

  return (
    <div className="Blog">
      <div style={showLimited} className="blogShowLimited">
        <p>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>view</button>
        </p>
      </div>
      <div style={showAll} className="blogShowAll">
        <h2>
          {blog.title} {blog.author}
          <button onClick={handleDisplayButton}>hide</button>
        </h2>
        <Link>{blog.url}</Link>
        <p className="numLikes">
          {blog.likes} Likes
          <button onClick={incrementBlogLike}>like</button>
        </p>
        <p>Added by {blog.author}</p>
        <h2>Comments</h2>
        <form onSubmit={handleCommentPosting}>
          <input {...comment.input} />
          <button type="submit">add comment</button>
        </form>
        {blog.comments.map((comment, index) => (
          <li key={index + 1}>{comment}</li>
        ))}
        <button style={showDeleteButton} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
