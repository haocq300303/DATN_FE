// Header.js
import { useEffect } from "react";
import {
   useSelector, 
  useDispatch } from "react-redux";
import {
  selectIsFixed,
  setFixed,
  setVisibleTitle,
} from "~/Redux/Slices/navbarSlice";
import "./Header.css";
import "~/assets/js/main.js";
import { Link } from "react-router-dom";

const Header = () => {
  const isFixed = useSelector(selectIsFixed);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 250) {
        dispatch(setFixed(true));
        dispatch(setVisibleTitle(true));
      } else {
        dispatch(setFixed(false));
        dispatch(setVisibleTitle(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <nav id="header" className={`fixed-header ${isFixed ? 'active' : ''} header-mobile`}>
    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div className="pl-4 flex items-center w-44">
        <img src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1696192598/ImageOther/z4718088485311_234f31f313ef91652f1da8c544568ddb-removebg-preview_yhtdtr.png" alt="" />
      </div>
      <div className="block lg:hidden pr-4">
        <button id="nav-toggle" className="flex items-center p-1 text-black hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center hidden lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
        <ul className="list-reset list-reset-header  lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/'}>Trang Chủ</Link>
          </li>
          <li className="mr-3">
          <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/pitch'}>Sân Bóng</Link>
          </li>
          <li className="mr-3">
          <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'#'}>Tìm Đối</Link>
          </li>
          <li className="mr-3">
          <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/post'}>Tin Tức</Link>
          </li>
          <li className="mr-3">
          <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/contact'}>Liên Hệ</Link>
          </li>
          <li className="mr-3">
          <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/about'}>Về Chúng Tôi</Link>
          </li>
        </ul>
        <Link className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4" to={'/contact'}>
        <button
          id="navAction"
          className="mx-auto lg:mx-0 hover:bg-green-600 hover:text-white bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Đăng Kí Đối Tác
        </button>
        </Link>
      </div>
    </div>
  </nav>
  );
};

export default Header;
