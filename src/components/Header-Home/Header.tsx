import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsFixed,
  setFixed,
  setVisibleTitle,
} from "~/Redux/Slices/navbarSlice";
import "./Header.css";
import { CloseOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="pl-0 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all "
      >
        <a
          href="/"
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Trang Chủ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <Link
          to="/pitch"
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Sân Bóng
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <Link
          to={"/pitch/find_opponent"}
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Tìm Đối
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <a
          href="/post"
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Tin Tức
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <a
          href="/contact"
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Liên Hệ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all"
      >
        <a
          href="/about"
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Về Chúng Tôi
        </a>
      </Typography>
    </ul>
  );
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
    <div id="header" className={`fixed-header ${isFixed ? "active" : ""}`}>
      <Navbar className="sticky box-border top-0 z-10 h-max max-w-full rounded-none px-4 py-2 container ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className=" flex items-center">
            <img
              className="w-28 lg:w-40"
              src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1696192598/ImageOther/z4718088485311_234f31f313ef91652f1da8c544568ddb-removebg-preview_yhtdtr.png"
              alt=""
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block border-none"
              >
                <UserOutlined />
              </Button>
              <Button className="hidden lg:inline-block bg-green-800 border-none">
                <Link
                  to="#dkdt"
                  className="flex items-center text-white no-underline shadow-none"
                >
                  Đăng Kí Đối Tác
                </Link>
              </Button>
            </div>
            <IconButton
              variant="text"
              className=" h-14 w-14  no-underline border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden flex items-center justify-center"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <CloseOutlined className="text-gray-500 text-2xl" />
              ) : (
                <MenuOutlined className="text-gray-500 text-2xl" />
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  );
};
export default Header;
