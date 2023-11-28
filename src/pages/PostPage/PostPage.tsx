import React, { useEffect } from "react";
import { getAllPostMid } from "~/Redux/Slices/postSlice";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import IPost from "~/interfaces/post";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const PostPage = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
//   console.log(posts);
  const calculateTimeAgo = (createdAt: any) => {
    const postDate: Date = new Date(createdAt);
    return formatDistanceToNow(postDate, { addSuffix: true, locale: vi });
  };
  useEffect(() => {
    dispatch(getAllPostMid());
  }, [dispatch]);
  return (
    <section className="px-5 py-10 dark:bg-gray-800 dark:text-gray-100">
	<div className="container grid grid-cols-9 mx-auto gap-y-6 md:gap-10">
		<div className="relative flex col-span-12 bg-center bg-no-repeat bg-cover dark:bg-gray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96">
			<div>
      <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 dark:border-violet-400 dark:text-gray-100">các Tin Tức Tâm Điểm</span>
      <section className="w-full  flex flex-col items-center px-3 mt-14">
      {posts?.map((post: IPost) => (
        <article className="flex justify-start flex-col shadow my-4 rounded-md  w-11/12 overflow-hidden" key={post._id}>
            <Link to="#" className="hover:opacity-75 h-96 overflow-hidden">
                <img className="w-full" src={post.images[0]}/>
            </Link>
            <div className="bg-white flex flex-col justify-start p-6">
                <Link to={`/post/${post._id}`} className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</Link>
                <p className="text-sm pb-3">
                    Đăng Bởi <a href="#" className="font-semibold hover:text-gray-800">Lê Sỹ Hải</a>{" "}
                          {calculateTimeAgo(post.createdAt)}
                </p>
                <Link to={`/post/${post._id}`} className="pb-6">{post.description}..</Link>
                <Link to={`/post/${post._id}`} className="uppercase text-gray-800 hover:text-black flex gap-2 items-center">Xem Bài Đăng<i className="fas fa-arrow-right"></i></Link>
            </div>
        </article>
))}
        <div className="flex items-center py-8">
            <a href="#" className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</a>
            <a href="#" className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</a>
            <a href="#" className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <i className="fas fa-arrow-right ml-2"></i></a>
        </div>
</section>
		</div>
      </div>
		<div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
			<div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
				<button type="button" className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-400">Tin Tức Mới Nhất</button>
			</div>
			<div className="flex flex-col divide-y dark:divide-gray-700">
				<div className="flex px-1 py-4">
					<img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/244x324" />
					<div className="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Aenean ac tristique lorem, ut mollis dui.</a>
						<p className="mt-auto text-xs dark:text-gray-400">5 minutes ago
							<a rel="noopener noreferrer" href="#" className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline">Politics</a>
						</p>
					</div>
				</div>
				<div className="flex px-1 py-4">
					<img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/245x325" />
					<div className="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Nulla consectetur efficitur.</a>
						<p className="mt-auto text-xs dark:text-gray-400">14 minutes ago
							<a rel="noopener noreferrer" href="#" className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline">Sports</a>
						</p>
					</div>
				</div>
				<div className="flex px-1 py-4">
					<img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/246x326" />
					<div className="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Vitae semper augue purus tincidunt libero.</a>
						<p className="mt-auto text-xs dark:text-gray-400">22 minutes ago
							<a rel="noopener noreferrer" href="#" className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline">World</a>
						</p>
					</div>
				</div>
				<div className="flex px-1 py-4">
					<img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/247x327" />
					<div className="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Suspendisse potenti.</a>
						<p className="mt-auto text-xs dark:text-gray-400">37 minutes ago
							<a rel="noopener noreferrer" href="#" className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline">Business</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
  );
};

export default PostPage;
