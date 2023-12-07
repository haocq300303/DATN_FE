import { useEffect, useState } from "react";
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
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
          {posts && posts.length > 0 ? (
            posts?.slice(0)?.reverse()?.map((post: IPost) => (
              <div key={post._id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
                <Link
                  to={`/post/${post._id}`}
                  className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                >
                  <img
                    src={post.images[0]}
                    loading="lazy"
                    alt="Photo by Minh Pham"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    <Link
                      to={`/post/${post._id}`}
                      className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      {' '}
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mb-8 text-gray-500">{post?.description?.substring(0, 100)}...</p>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src="https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
                          loading="lazy"
                          alt="Photo by Brock Wegner"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div>
                        <span className="block text-gray-400">
                          Hệ Thống
                        </span>
                        <span className="block text-sm text-gray-400">
                          {post.updatedAt}
                        </span>
                      </div>
                    </div>

                    <span className="rounded border px-2 py-1 text-sm text-gray-500">
                      Thông Báo
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div><Empty /></div>
          )}
        </div>
        <div className="flex justify-center mt-[30px]">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={6}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;