import React, { useEffect } from "react";
import { getAllPostMid } from "~/Redux/Slices/postSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import IPost from "~/interfaces/post";
import { Link } from "react-router-dom";

const PostPage = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);
  return (
    <div className="container mx-auto pt-24">
      {posts?.map((post: IPost) => (
        // item
        <div className="relative w-3/4 flex flex-col rounded-2xl bg-white text-gray-700 border-2 border-solid border-[#e8e8e8] px-6 py-4 mb-6">
          <div className="cursor-pointer">
            <img
              className="inline-block h-8 w-8 rounded-full object-cover object-center mr-2"
              alt="Image placeholder"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <p className="inline-block font-sans text-sm font-medium leading-normal text-blue-gray-900">
              {post.id_user?.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-4">
              <Link to={`/post/${post._id}`}>
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {post.title}
                </h5>
              </Link>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                {post.description}
              </p>
            </div>
            <img
              className="block max-h-[120px] w-[200px] rounded-lg object-cover object-center"
              alt="Image placeholder"
              src={post.images[0]}
            />
          </div>
          <div className="">
            <button
              className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
