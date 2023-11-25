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
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
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
  const calculateTimeAgo = (createdAt: any) => {
    const postDate: Date = new Date(createdAt);
    return formatDistanceToNow(postDate, { addSuffix: true, locale: vi });
  };
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
    <div className="container mx-auto">
      <section className="px-5 py-10 dark:bg-gray-800 dark:text-gray-100">
        <div className="container grid grid-cols-9 mx-auto gap-y-6 md:gap-10">
          <div className="relative flex col-span-12 bg-center bg-no-repeat bg-cover dark:bg-gray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96">
            <div>
              <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 dark:border-violet-400 dark:text-gray-100">
                các Tin Tức Tâm Điểm
              </span>
              <section className="w-full flex flex-col items-center px-3 mt-14">
                <article className="flex flex-col shadow my-4  overflow-hidden">
                  <a href="#" className="hover:opacity-75 h-96 overflow-hidden">
                    <img className="w-full" src={post?.images[0]} />
                  </a>
                  <div className="bg-white flex flex-col justify-start p-6">
                    <p className="text-sm pb-3">
                      Đăng Bởi{" "}
                      <a href="#" className="font-semibold hover:text-gray-800">
                        Lê Sỹ Hải
                      </a>{" "}
                      {post?.createdAt && calculateTimeAgo(post?.createdAt)}
                    </p>
                    <a
                      href="#"
                      className="text-3xl font-bold hover:text-gray-700 pb-4"
                    >
                      {post?.title}
                    </a>
                    <p className="pb-3">{post?.description}</p>
                  </div>
                </article>
              </section>
            </div>
          </div>
          <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
            <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
              <button
                type="button"
                className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-400"
              >
                Tin Tức Mới Nhất
              </button>
            </div>
            <div className="flex flex-col divide-y dark:divide-gray-700">
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="https://source.unsplash.com/random/244x324"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Aenean ac tristique lorem, ut mollis dui.
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    5 minutes ago
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                    >
                      Politics
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="https://source.unsplash.com/random/245x325"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Nulla consectetur efficitur.
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    14 minutes ago
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                    >
                      Sports
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="https://source.unsplash.com/random/246x326"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Vitae semper augue purus tincidunt libero.
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    22 minutes ago
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                    >
                      World
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src="https://source.unsplash.com/random/247x327"
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Suspendisse potenti.
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                    37 minutes ago
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                    >
                      Business
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col rounded-xl bg-transparent text-gray-700 shadow-none mb-10 w-2/3">
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
