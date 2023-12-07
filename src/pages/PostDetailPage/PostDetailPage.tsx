import { Button, Empty, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCommentMid, getAllCommentMid } from "~/Redux/Slices/commentSlide";
import { getAllPostMid } from "~/Redux/Slices/postSlice";

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
  const [form] = Form.useForm();
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

  const [Char, setChar] = useState('');
  const [Comment, setComment] = useState<string[]>([]);

  const posts = useAppSelector((state) => state.post.posts);
  // console.log("data post", posts);
  const comments = useAppSelector((state) => state.comment.comments);
  console.log("data comments", comments);



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


  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllCommentMid());
  }, [dispatch]);


  useEffect(() => {
    if (post && post.comment_id) {
      const cmtId = post?.comment_id?.map((item: any) => item._id);
      if (cmtId) {
        setComment(cmtId);
      }
    }
  }, [post]); // Chạy lại effect khi post thay đổi
  // console.log("cmt", Comment);

  //comment
  const handleCharChange = (e: any) => {
    const value = e.target.value;
    setChar(value);
  };
  const onFinishComment = async (values: any) => {
    try {
      const response = await dispatch(createCommentMid(values));
      console.log("res", response);
      if (response?.meta?.requestStatus === "fulfilled") {
        message.success("Đánh giá Thành Công !");
      }
      const cmtId: string = response.payload?._id;
      setComment((prevFeedbackList) => [...prevFeedbackList, cmtId]);
      await dispatch(getAllCommentMid());
      form.resetFields(['content']);
      setChar('');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container mx-auto">
    <div className="pt-[20px]">
      <nav aria-label="Breadcrumb" className="flex w-full rounded-lg bg-gray-100/50">
        <ol
          className="flex overflow-hidden rounded-lg  text-gray-600"
        >
          <li className="flex items-center">
            <Link
              to={`/`}
              className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <span className="ms-1.5 text-xs font-medium"> Trang Chủ </span>
            </Link>
          </li>

          <li className="relative flex items-center">
            <span
              className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
            >
            </span>

            <Link
              to={`/post`}
              className="flex h-10 items-center  pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
            >
              Tin Tức
            </Link>
          </li>
          <li className="relative flex items-center">
            <span
              className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100/50 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
            >
            </span>

            <Link
              to={`#`}
              className="flex h-10 items-center  pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
            >
              {post?.title}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
    {/*  */}
    <div className=" flex justify-center gap-[30px] mx-auto pt-[40px] mb-20">
      <div className=" flex-col text-gray-700 overflow-auto">
      <div className="container grid grid-cols-9 mx-auto gap-y-6 md:gap-10">
          <div className="relative flex col-span-12 bg-center bg-no-repeat bg-cover dark:bg-gray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96">
            <div>
              <section className="w-full flex flex-col items-center px-3 mt-8">
                <article className="flex flex-col my-4 h-[1000px]  overflow-auto ">
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
              {posts && posts.length > 0 ? (
                  posts.slice(0, 8).map((item: IPost) => (
                <Link className="flex px-1 py-4" key={item?._id} to={`/post/${item._id}`}>
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src={item?.images[0]}
                />
                <div className="flex flex-col flex-grow">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    {item?.title}
                  </a>
                  <p className="mt-auto text-xs dark:text-gray-400">
                  {post?.createdAt && calculateTimeAgo(post?.createdAt)}
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                    >
                      Politics
                    </a>
                  </p>
                </div>
                </Link>
                  ))
                ) : (
                  <div><Empty /></div>
                )}
    
            </div>
          </div>
        </div>
        <div className="border-b-[1px] border-gray-700"></div>
        <div className="border-b-[1px] border-gray-700 mt-[1px]"></div>
        <div className=" mx-[100px]">
          <h1 className="text-2xl text-blue-500 font-sans font-[500] mt-[20px] mb-[15px]">Nhận Xét Về Bài Đăng :</h1>
          <Form
            form={form}
            onFinish={onFinishComment}
          >
            <Form.Item
              name="content"
              rules={[{ required: true, message: 'Hãy viết bình luận của mình !' }]}
            >
              <TextArea
                rows={4}
                placeholder="Nhập Bình Luận !"
                value={Char}
                onChange={handleCharChange}
              />
            </Form.Item>
            <Form.Item hidden name="id_post" initialValue={id!}>
              <Input type="text" defaultValue={id} />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item>
                <Button type="primary" className=" bg-blue-600" htmlType="submit">
                  Bình Luận
                </Button>
              </Form.Item>
              <h1> Tối Đa : <span className="font-[600]">{1500 - Char.length} Kí Tự</span> </h1>
            </div>
          </Form>

          <div className="bg-gray-100/50">
            <div className=" bg-gray-100 py-[10px] border-b-[1px] border-gray-700">
              <p className="ml-[10px]">Bình Luận Mới Nhất</p>
            </div>
            <div>
              {Comment && Comment.length > 0 ? (
                Comment?.slice()?.reverse()?.map((data: any) => {

                  const cmts: any = comments?.find((item: IComment) => item._id == data);
                  if (!cmts) {
                    return null;
                  }
                  return (
                    <div key={cmts?._id} className="flex w-full mt-[10px] bg-none">
                      <img className="w-10 h-10 me-4 rounded-full" src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" alt="" />
                      <div className="w-full rounded-md">
                        <div className="h-[40px] flex justify-between items-center w-full ">
                          <h1 className="text-[19px] font-[550]">{cmts?.id_user?.name}</h1>
                          <h1>{cmts?.createdAt}</h1>
                        </div>
                        <div>
                          <p>{cmts?.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h1 className="text-center">Chưa Có Bình Luận. Bạn Hãy Là Người Bình Luận Đầu tiên !</h1>
                </div>
              )}

              {/*  */}

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

  );
};

export default PostDetailPage;
