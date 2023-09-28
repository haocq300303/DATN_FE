import instance from "./config";
import IComment from "../interfaces/comment";

const getAllComment = () => {
  return instance.get(`comments`);
};

const getOneComment = (idComment: string) => {
  return instance.get(`comments/${idComment}`);
};

const createComment = (comment: IComment) => {
  return instance.post(`comments`, comment);
};

const updateComment = (comment: IComment) => {
  return instance.put(`comments/${comment._id}`, comment);
};

const deleteComment = (idComment: string) => {
  return instance.delete(`comments/${idComment}`);
};

export {
  getAllComment,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
};
