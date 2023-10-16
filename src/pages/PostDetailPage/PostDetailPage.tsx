import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createCommentMid,
  getCommentByPostMid,
} from "~/Redux/Slices/commentSlide";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import { getOnePost } from "~/api/post";
import IComment from "~/interfaces/comment";
import IPost from "~/interfaces/post";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  content: string;
};

const PostDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<IPost>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const commentValue = {
      ...data,
      id_user: "65131393f8698962d691cd12",
      id_post: id,
    };
    await dispatch(createCommentMid(commentValue));
    reset();
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOnePost(String(id));
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const comments = useAppSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(getCommentByPostMid(String(id)));
  }, [dispatch, id]);

  return (
    <div className="container max-w-3xl mx-auto pt-24 mb-20">
      <div className="flex w-full flex-col text-gray-700">
        <h4 className="block font-sans text-4xl font-semibold leading-snug text-blue-gray-900 mb-6">
          {post?.title}
        </h4>
        <div className="cursor-pointer mb-6">
          <img
            className="inline-block h-12 w-12 rounded-full object-cover object-center mr-4"
            alt="Image placeholder"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <p className="inline-block font-sans text-base font-semibold font-medium leading-normal text-blue-gray-900">
            {post?.id_user?.name}
          </p>
        </div>
        <div className="m-0 overflow-hidden bg-transparent text-gray-700">
          <img src={post?.images[0]} alt="Image" className="w-full" />
        </div>
        <div className="py-6">
          <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
            {post?.description}
          </p>
        </div>
        <div className="flex items-center justify-end py-6">
          <p className="block font-sans text-base font-normal leading-relaxed">
            {post?.createdAt}
          </p>
        </div>
      </div>
      {/* comment */}
      <div className="flex flex-col rounded-xl bg-transparent text-gray-700 shadow-none mb-10">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
          Để lại bình luận
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full">
          <div className="mb-2 flex flex-col gap-6">
            <div className="relative w-full min-w-[200px]">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                {...register("content", { required: true })}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Comment
              </label>
              {errors.content && (
                <span className="text-red-900">This field is required</span>
              )}
            </div>
          </div>

          <button
            className="mt-4 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
      {/* comment item */}
      {comments?.map((comment: IComment) => (
        <div
          key={comment?._id}
          className="relative flex w-full flex-col rounded-xl bg-transparent text-gray-700 shadow-none mb-4"
        >
          <div className="relative flex items-center gap-4 overflow-hidden rounded-xl bg-transparent pt-0 pb-4 text-gray-700 shadow-none">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              alt="tania andrew"
              className="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center"
            />
            <h5 className="block font-sans text-base font-semibold leading-snug tracking-normal text-blue-gray-900">
              {comment?.id_user}
            </h5>
          </div>
          <div className="mb-4 p-0">
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {comment?.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailPage;
