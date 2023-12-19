import { Button, Carousel, Empty, Form, Image, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCommentMid } from '~/Redux/Slices/commentSlide';
import { getAllPostMid } from '~/Redux/Slices/postSlice';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { getCommentPost, getOnePost } from '~/api/post';
import IPost from '~/interfaces/post';

const PostDetailPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<IPost>();
  const [Char, setChar] = useState('');
  const [IdComment, setIdComment] = useState<any>();
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const posts = useAppSelector((state) => state.post.posts);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOnePost(String(id));
        setPost(data.data);
      } catch (error) {
        //console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCommentPost(String(id));
        setIdComment(data.data.comment_id);
      } catch (error) {
        //console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);

  //comment
  const handleCharChange = (e: any) => {
    const value = e.target.value;
    setChar(value);
  };
  const onFinishComment = async (values: any) => {
    try {
      if (values.content.trim() === '') {
        message.warning('Nội dung không được để trống.');
        return;
      }
      const response = await dispatch(createCommentMid(values));

      if (response?.meta?.requestStatus === 'fulfilled') {
        message.success('Bình Luận Thành Công !');
        setIdComment((prevComments: any) => [...prevComments, { ...response?.payload }]);
      }
      form.resetFields(['content']);
      setChar('');
    } catch (error) {
      //console.log(error);
    }
  };

  const contentStyle: React.CSSProperties = {
    height: '520px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div className="container mx-auto">
      <div className="pt-[20px]">
        <nav aria-label="Breadcrumb" className="flex w-full rounded-lg bg-gray-100/50">
          <ol className="flex overflow-hidden rounded-lg  text-gray-600">
            <li className="flex items-center">
              <Link to={`/`} className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clipPath:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

              <Link to={`/post`} className="flex h-10 items-center  pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
                Tin Tức
              </Link>
            </li>
            <li className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100/50 [clipPath:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

              <Link to={`#`} className="flex h-10 items-center  pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
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
            <h4 className="block font-sans text-4xl font-semibold leading-snug text-blue-gray-900 mb-6">{post?.title}</h4>
            <div className="flex justify-center gap-[20px]">
              <div className="m-0 overflow-auto bg-transparent text-gray-700 w-[2500px] h-[1100px] rounded-xl">
                <Carousel autoplay>
                  {post?.images?.map((data) => (
                    <div>
                      <Image style={contentStyle} width={900} src={data} />
                    </div>
                  ))}
                </Carousel>
                <div className="py-6">
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.description || '' }}
                    className="mt-3 block font-sans text-xl font-normal leading-10 text-gray-700 antialiased"
                  ></div>
                </div>
                <div className="flex items-center justify-end py-6">
                  <p className="block font-sans text-base font-normal leading-relaxed">{post?.updatedAt}</p>
                </div>
              </div>
              <div className="w-full ">
                <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 flex items-center p-3 pointer-events-none">
                      <svg
                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block outline-none focus:border-gray-300 rounded-full w-full p-4 ps-6 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Tìm Kiếm..."
                      required
                    />
                  </div>
                </form>

                <h1 className="my-4  text-2xl font-sans font-[600]">Tin Mới Nhất</h1>
                <div className=" ">
                  {posts && posts.length > 0 ? (
                    posts?.slice(0, 6).map((item: IPost) => (
                      <a key={item?._id} href={`/post/${item._id}`}>
                        <div className="flex gap-[10px] mt-[10px]  rounded-md">
                          <img className="w-[80px] h-[80px] rounded-md" src={item?.images[0]} alt="" />
                          <h1 className="w-[330px] text-[20px]">{item?.title}</h1>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div>
                      <Empty />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-[1px] border-gray-700"></div>
          <div className="border-b-[1px] border-gray-700 mt-[1px]"></div>
          <div className=" mx-[100px]">
            <h1 className="text-2xl text-blue-500 font-sans font-[500] mt-[20px] mb-[15px]">Nhận Xét Về Bài Đăng :</h1>
            {isLogged ? (
              <Form form={form} onFinish={onFinishComment}>
                <Form.Item name="content" rules={[{ required: true, message: 'Hãy viết bình luận của mình !' }]}>
                  <TextArea rows={4} placeholder="Nhập Bình Luận !" maxLength={1500} value={Char} onChange={handleCharChange} />
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
                  <h1>
                    {' '}
                    Tối Đa : <span className="font-[600]">{1500 - Char.length} Kí Tự</span>{' '}
                  </h1>
                </div>
              </Form>
            ) : (
              <p className="mb-4">Vui lòng đăng nhập để bình luận!</p>
            )}

            <div className="bg-gray-100/50">
              <div className=" bg-gray-100 py-[10px] border-b-[1px] border-gray-700">
                <p className="ml-[10px]">Bình Luận Mới Nhất</p>
              </div>
              {IdComment && IdComment.length > 0 ? (
                <div className="overflow-y-scroll h-[540px]">
                  {IdComment?.slice()
                    ?.reverse()
                    .map((cmts: any) => (
                      <div key={cmts?._id} className="flex w-full mt-[10px] bg-none">
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
                          alt=""
                        />
                        <div className="w-full rounded-md">
                          <div className="h-[40px] flex justify-between items-center w-full">
                            <h1 className="text-[19px] font-[550]">{cmts?.id_user?.name ? cmts?.id_user?.name : cmts?.user?.name}</h1>
                            <h1 className="pr-[20px]">{cmts?.createdAt}</h1>
                          </div>
                          <div>
                            <TextArea readOnly value={cmts?.content} autoSize={{ minRows: 2, maxRows: 6 }} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
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
  );
};

export default PostDetailPage;
