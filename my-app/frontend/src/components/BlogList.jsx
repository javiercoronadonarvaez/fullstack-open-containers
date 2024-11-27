import { BrowserRouter as Router, Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  if (blogs) {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <div className="blogLink" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default BlogList;
