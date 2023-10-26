import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsFixed,
  setFixed,
  setVisibleTitle,
} from "~/Redux/Slices/navbarSlice";
import "./Header.css";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Trang Chủ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/pitch" className="flex items-center">
          Sân Bóng
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Tìm Đối
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/contact" className="flex items-center">
          Liên Hệ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/about" className="flex items-center">
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
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="pl-4 flex items-center w-44">
            <img
              src="https://res.cloudinary.com/dlu4tkcct/image/upload/v1696192598/ImageOther/z4718088485311_234f31f313ef91652f1da8c544568ddb-removebg-preview_yhtdtr.png"
              alt=""
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <UserOutlined />
              </Button>
              <Button className="hidden lg:inline-block bg-green-800">
                <a href="/contact" className="flex items-center">
                 Đăng Kí Đối Tác
                </a>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-16 w-16 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <hr className="bg-gray-400"/>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=" border-2 "
            >
             <a href="/login" className="flex items-center gap-2 justify-center">
             <UserOutlined /> <span>Đăng Nhập</span>
                </a>
            </Button>
            <Button fullWidth size="sm" className="bg-green-800">
            <a href="/contact" className="flex items-center justify-center">
                 Đăng Kí Đối Tác
                </a>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
