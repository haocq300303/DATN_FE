import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import FsportLogo from "~/assets/img/logo-black.png";
import { useAppSelector } from "~/Redux/hook";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { routes } from "~/routes";
import ModalEditUser from "~/components/ModalEditUser/ModalEditUser";


function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const closeMenu = () => setIsMenuOpen(false);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
    <div className="flex items-center px-8 shadow justify-between">
      <img className="w-[160px]" src={FsportLogo} alt="" />
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className='flex items-center gap-2 border-2 border-gray-300 p-1 px-2 rounded-full'>
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

<MenuItem
  onClick={closeMenu}
  className={`flex flex-col gap-2 rounded `}
>
 <Button
    className="flex items-center gap-2 font-normal border-none bg-transparent text-black shadow-none hover:shadow-none hover:bg-gray-300 w-full rounded-sm"
    style={{  zIndex: 101 }}
    onClick={() => showModal()}
  >
 <UserCircleIcon className='h-4 w-5'/>
    Thông Tin Cá Nhân
  </Button>
 <Link to={routes.login} className='hover:bg-red-50 w-full rounded-sm'>
 <Button
    className="flex items-center gap-2  font-normal border-none bg-transparent text-red-700 shadow-none hover:shadow-none "
    style={{  zIndex: 101 }}
  >
    <PowerIcon className='h-4 w-4'/>
    Đăng Xuất
  </Button>
 </Link>
</MenuItem>
</MenuList>
   
   </div>
      </Menu>
    </div>
    {isModalOpen && <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </>
  );
}


export default HeaderAdmin;
