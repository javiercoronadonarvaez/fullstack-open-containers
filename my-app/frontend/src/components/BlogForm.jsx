import { useField } from "../hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../requests";
import { useNotificationDispatch } from "./NotificationContext";
import Togglable from "./Togglable";

const BlogForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      console.log("NEW BLOG", newBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      const notification = `A new Blog ${newBlog.title} from ${newBlog.author} added`;
      console.log("NOTIFICATION", notification);
      notificationDispatch({ type: "UPDATE", payload: notification });
    },
  });

  const addNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    };
    newBlogMutation.mutate(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <Togglable buttonLabel="New Note">
      <form onSubmit={addNewBlog}>
        <h2>Create New</h2>
        <div>
          Title:
          <input {...title.input} />
        </div>
        <div>
          Author:
          <input {...author.input} />
        </div>
        <div>
          Url:
          <input {...url.input} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
