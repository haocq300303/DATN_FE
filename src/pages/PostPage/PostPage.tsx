import React, { useEffect, useState } from "react";
import { getAllPostMid, setData } from "~/Redux/Slices/postSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import IPost from "~/interfaces/post";
import { Link } from "react-router-dom";
import { Empty, Pagination } from "antd";
import { PostPagination, getAllPost } from "~/api/post";

const PostPage = () => {
  const dispatch = useAppDispatch();

  const [totalItems, setTotalItems] = useState(Number);//phantrang
  const [currentPage, setCurrentPage] = useState(1);//phantrang

  const posts = useAppSelector((state) => state.post.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);

  //phân trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPost(); // Gửi yêu cầu GET đến URL_API
        const allItemsPitch = response?.data?.data?.totalDocs;
        setTotalItems(allItemsPitch)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const response = await PostPagination(pageNumber);
    const totalItems = response?.data?.data?.totalDocs;
    if (totalItems) {
      setTotalItems(totalItems);
    }
    dispatch(setData(response?.data?.data?.data));
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }
  return (
    <div className="container mx-auto pt-[20px] pb-[40px]">
      <div>
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
          </ol>
        </nav>
      </div>
      <div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
          {posts && posts.length > 0 ? (
            posts.map((item: IPost) => (
              <Link key={item._id} className="rounded-md bg-gray-100 lg:aspect-none group-hover:opacity-75 " to={`/post/${item._id}`}>
                <img className="rounded-md h-[200px] w-full" src={`${item.images}`} alt="" />
                <h2 className=" font-sans text-[18px]  pt-[5px] ">{item.title}</h2>
                <p className=" italic">{item.description.substring(0, 70)}...</p>
                <Link className=" italic text-red-500" to={`/post/${item._id}`}>Xem Thêm ...</Link>
              </Link>
            ))
          ) : (
            <div><Empty /></div>
          )}
        </div>
        <div className="flex justify-center mt-[30px]">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
