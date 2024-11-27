import axios from "axios";

const baseUrl = "/api/blogs";
const loginUrl = "/api/login";
const usersUrl = "/api/users";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getBlogs = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const getUsers = async () => {
  const request = await axios.get(usersUrl);
  return request.data;
};

export const getUser = async (user) => {
  const userUrl = `${usersUrl}/${user.id}`;
  const request = await axios.get(userUrl);
  return request.data;
};

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

export const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return request.data;
};

export const postBlogComment = async (updatedBlog) => {
  console.log("ACCESSING POST COMMENT");
  const request = await axios.post(
    `${baseUrl}/${updatedBlog.id}/comments`,
    updatedBlog
  );
  return request.data;
};

export const deleteBlog = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config);
  return request.data;
};

export const login = async (credentials) => {
  const request = await axios.post(loginUrl, credentials);
  return request.data;
};
