interface IPost {
  _id?: string;
  title: string;
  id_user: any;
  description: string;
  images: string[];
  comment_id?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default IPost;
