import React, { useState } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Avatar,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon, PowerIcon, BookmarkIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';
import logo from '../../assets/img/logoFsport.png';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '~/Redux/store';
import { routes } from '~/routes';
import ModalEditUser from '../ModalEditUser/ModalEditUser';

function NavList() {
  return (
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
}

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  const closeMenu = () => setIsMenuOpen(false);
  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Navbar className="mx-auto max-w-screen-2xl px-4 py-2 border-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center justify-between ">
            <Link to="/">
              <img src={logo} className="w-24" alt="" />
            </Link>
          </div>
          <div className="w-72">
            <Input label="Tìm Nhanh Sân ..." crossOrigin="anonymous" />
          </div>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            {isLogged ? (
              <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <div className="flex items-center gap-2 border-2 border-gray-300 p-1 px-2 rounded-full">
                  <p className="text-sm"> {user.values?.name}</p>
                  <MenuHandler>
                    <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0.5 lg:ml-auto">
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
                      {user?.values?.role_name === 'admin' && (
                        <Link to={'/admin'} className="hover:bg-gray-300 w-full rounded-sm">
                          <Button
                            className="flex items-center gap-2 font-normal border-none bg-transparent text-black shadow-none hover:shadow-none"
                            style={{ zIndex: 101 }}
                          >
                            <BriefcaseIcon className="h-4 w-4" />
                            Quản trị
                          </Button>
                        </Link>
                      )}
                      {user?.values?.role_name === 'adminPitch' && (
                        <Link to={'/admin-pitch'} className="hover:bg-gray-300 w-full rounded-sm">
                          <Button
                            className="flex items-center gap-2 font-normal border-none bg-transparent text-black shadow-none hover:shadow-none"
                            style={{ zIndex: 101 }}
                          >
                            <BriefcaseIcon className="h-4 w-4" />
                            Quản trị
                          </Button>
                        </Link>
                      )}
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
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden"></div>
        </Collapse>
      </Navbar>
      {isModalOpen && <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
