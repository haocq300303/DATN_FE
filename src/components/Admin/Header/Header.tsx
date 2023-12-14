import React from "react";
import {
  Typography,
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
const profileMenuItems = [
  {
    label: "Đăng Xuất",
    icon: PowerIcon,
    href: "/login",
  },
];

function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex items-center px-8 shadow justify-between">
      <img className="w-[160px]" src={FsportLogo} alt="" />
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className='flex items-center gap-2 border-2 border-gray-300 p-1 px-2 rounded-full'>
   {user.values.name}
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
            className="border border-gray-900 p-0.5"
            src="https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
          />
        </Button> 
      </MenuHandler>
      <MenuList className="p-1 mt-2">
        {profileMenuItems.map(({ label, icon, href }, key) => {
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
             <Link to={href}>
             <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                style={{  zIndex: 101 }}
              >
                {label}
              </Typography>
             </Link>
            </MenuItem>
          );
        })}
      </MenuList>
   
   </div>
      </Menu>
    </div>
  );
}


export default HeaderAdmin;
