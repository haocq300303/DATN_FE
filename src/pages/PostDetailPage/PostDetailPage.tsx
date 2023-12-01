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


const PostDetailPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<IPost>();
  const [Char, setChar] = useState('');
  const [Comment, setComment] = useState<string[]>([]);

  const posts = useAppSelector((state) => state.post.posts);
  // console.log("data post", posts);
  const comments = useAppSelector((state) => state.comment.comments);
  console.log("data comments", comments);

  // console.log("detail Post", post);

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
          <div>
            <h4 className="block font-sans text-4xl font-semibold leading-snug text-blue-gray-900 mb-6">
              {post?.title}
            </h4>
            <div className="flex justify-center gap-[20px]">
              <div className="m-0 overflow-hidden bg-transparent text-gray-700">
                <img src={post?.images[0]} alt="Image" className="w-full" />
              </div>
              <div className="w-full ">
                <h1 className="text-center text-xl font-sans font-[600]">Tin Mới Nhất</h1>
                <div className="pt-[25px] ">
                  {posts && posts.length > 0 ? (
                    posts.slice(0, 8).map((item: IPost) => (
                      <Link key={item?._id} to={`/post/${item._id}`}>
                        <div className="flex justify-center items-center gap-[5px] mt-[10px] bg-gray-200 rounded-md">
                          <img className="w-[100px] rounded-md" src={item?.images[0]} alt="" />
                          <h1>{item?.title}</h1>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div><Empty /></div>
                  )}

                </div>
              </div>
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
