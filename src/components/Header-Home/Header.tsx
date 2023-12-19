import { useEffect, useState } from 'react';
import { Navbar, Typography, Button, IconButton } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsFixed, setFixed, setVisibleTitle } from '~/Redux/Slices/navbarSlice';
import './Header.css';
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';
import React from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar } from '@material-tailwind/react';

import { RootState } from '~/Redux/store';
// import ModalEditUser from '../ModalEditUser/ModalEditUser';
import { BookmarkIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const closeMenu = () => setIsMenuOpen(false);
  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
              {isLogged ? (
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                  <div className="flex items-center gap-2 border-2 border-gray-300 p-1 px-2 rounded-full">
                    {user.values?.name}
                    <MenuHandler>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0.5 lg:ml-auto"
                      >
                        <Avatar
                          variant="circular"
                          size="sm"
                          alt="tania andrew"
                          className="border border-gray-900 w-6 h-6"
                          src="https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
                        />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1 mt-2">
                      <MenuItem onClick={closeMenu} className={`flex flex-col gap-2 rounded `}>
                        <Button
                          className="flex items-center gap-2 font-normal border-none bg-transparent text-black shadow-none hover:shadow-none hover:bg-gray-300 w-full rounded-sm"
                          style={{ zIndex: 101 }}
                          onClick={() => showModal()}
                        >
                          <UserCircleIcon className="h-4 w-5" />
                          Thông Tin Cá Nhân
                        </Button>
                        <Link to={routes.bookingHistory} className="hover:bg-gray-300 w-full rounded-sm">
                          <Button
                            className="flex items-center gap-2 font-normal border-none bg-transparent text-black shadow-none hover:shadow-none"
                            style={{ zIndex: 101 }}
                          >
                            <BookmarkIcon className="h-4 w-4" />
                            Lịch Sử Đặt
                          </Button>
                        </Link>
                        <Link to={routes.login} className="hover:bg-red-50 w-full rounded-sm">
                          <Button
                            className="flex items-center gap-2 font-bold font-normal border-none bg-transparent text-red-700 shadow-none hover:shadow-none "
                            style={{ zIndex: 101 }}
                          >
                            <PowerIcon className="h-4 w-4" />
                            Đăng Xuất
                          </Button>
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </div>
                </Menu>
              ) : (
                <Link
                  to={'/login'}
                  className="flex items-center gap-2  border-2 border-gray-400 p-1 rounded-2xl ease-linear hover:shadow-lg hover:ease-linear"
                >
                  <UserOutlined className=" bg-gray-300 p-2 rounded-xl" />
                  Đăng Nhập
                </Link>
              )}
            </div>
            <IconButton
              variant="text"
              className=" h-14 w-14  no-underline border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden flex items-center justify-center"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? <CloseOutlined className="text-gray-500 text-2xl" /> : <MenuOutlined className="text-gray-500 text-2xl" />}
            </IconButton>
          </div>
        </div>
      </Navbar>
      {/* {isModalOpen && <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} */}
    </div>
  );
};
export default Header;
