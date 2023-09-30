interface IComment {
  _id?: string;
  content: string;
  id_user: string;
  id_post: string;
  createdAt: string;
  updatedAt?: string;
}

export default IComment;
