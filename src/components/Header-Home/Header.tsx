import { useEffect } from 'react';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsFixed,
  setFixed,
  setVisibleTitle,
} from '~/Redux/Slices/navbarSlice';
import './Header.css';
import { CloseOutlined, MenuOutlined, UserOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';
import { logout } from '~/Redux/Slices/userSlice';
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { RootState } from '~/Redux/store';

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const closeMenu = () => setIsMenuOpen(false);
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const profileMenuItems = [
    {
      label: user.values.name,
      icon: UserCircleIcon,
    },
    {
      label: "Chỉnh sửa tài khoản",
      icon: Cog6ToothIcon,
    },
    {
      label: "Đăng Xuất",
      icon: PowerIcon,
    },
  ];
  const navList = (
    <ul className="pl-0 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all "
      >
        <Link
          to={routes.home}
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Trang Chủ
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <Link
          to={routes.pitch_client}
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
          to={routes.find_opponent}
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
        <Link
          to={routes.post_client}
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Tin Tức
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all transition-all"
      >
        <Link
          to={routes.contact}
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Liên Hệ
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:bg-gray-300 lg:hover:bg-transparent hover:transition-all"
      >
        <Link
          to={routes.about}
          className="flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
        >
          Về Chúng Tôi
        </Link>
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);
  return (
    <div id="header" className={`fixed-header ${isFixed ? 'active' : ''}`}>
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
            <div className="flex items-center gap-x-1 ">
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" >
      <MenuHandler>
        { isLogged ?    <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button> : <UserOutlined /> }
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                style={{  zIndex: 101 }}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
              <Button className="hidden lg:inline-block bg-green-800 border-none">
                <Link
                  to={routes.login}
                  className="flex items-center text-white no-underline shadow-none"
                  onClick={() => {
                    dispatch(logout());
                  }}
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
