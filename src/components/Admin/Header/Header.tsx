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
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import FsportLogo from "~/assets/img/logo-black.png";
const profileMenuItems = [
  {
    label: "Tài khoản của tôi",
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
 
function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
   <div className="flex items-center px-8 py-4  shadow">
       <img className="w-28" src={FsportLogo} alt="" />
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" >
      <MenuHandler>
        <Button
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
        </Button>
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
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
   </div>
  );
}
 
// export function ComplexNavbar() {
//  return (
//     <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
//       <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
//         <Typography
//           as="a"
//           href="#"
//           className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
//         >
//           <img src={FsportLogo} alt="" />
//         </Typography>
      
//         <Button size="sm" variant="text">
//           <span>Log In</span>
//         </Button>
//         <HeaderAdmin />
//       </div>
//     </Navbar>
//   );
// }

export default HeaderAdmin;