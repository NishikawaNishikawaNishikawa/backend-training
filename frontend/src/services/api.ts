import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const addPost = async (post: {
  userId: number;
  title: string;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

export const getComments = async () => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};

export const addComment = async (comment: {
  postId: number;
  userId: number;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/comments`, comment);
  return response.data;
};

export const updatePost = async (impPost: {
  id: number;
  title: string;
  content: string;
}) => {
  const response = await axios.put(`${API_URL}/posts/${impPost.id}`, impPost);
  return response.data;
};
