import instance from "./config";
import IPost from "../interfaces/post";

const getAllPost = () => {
  return instance.get(`posts`);
};

const getOnePost = (idPost: string) => {
  return instance.get(`posts/${idPost}`);
};
const getCommentPost = (idPost: string) => {
  return instance.get(`posts/comment/${idPost}`);
};

const createPost = (post: IPost) => {
  return instance.post(`posts`, post);
};

const updatePost = (_id: string, post: IPost) => {
  return instance.put(`posts/${_id}`, post);
};

const deletePost = (idPost: string) => {
  return instance.delete(`posts/${idPost}`);
};
const PostPagination = (page?: number,) => {
  return instance.get(`posts?page=${page}`);
};

export { getAllPost, getOnePost, createPost, updatePost, deletePost, PostPagination, getCommentPost };
