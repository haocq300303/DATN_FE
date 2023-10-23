import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
  Input,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FolderIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { FaBasketballBall, FaVolleyballBall } from "react-icons/fa";
import { IoIosFootball, IoMdTennisball } from "react-icons/io";
import { TbYoga } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoFsport.png";
import "./Header.css";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};
const profileMenuItems = [
  {
    label: "Thông Tin Cá Nhân",
    icon: FaceFrownIcon,
  },
  {
    label: "Sửa Thông Tin ",
    icon: Cog6ToothIcon,
  },

  {
    label: "Trợ Giúp",
    icon: LifebuoyIcon,
  },
  {
    label: "Đăng Xuất",
    icon: PowerIcon,
  },
];

const navListMenuItems = [
  {
    color: "green",
    icon: IoIosFootball,
    title: (
      <div className="flex items-center gap-1">
        Bóng Đá{" "}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="Tuyển thành viên!"
          className="capitalize"
        />
      </div>
    ),
    src: "/pitch",
    description: "Đặt lịch và tìm đối đá bóng khu vực Hà Nội",
  },
  {
    color: "orange",
    icon: FaBasketballBall,
    title: "Bóng Rổ",
    src: "/pitch",
    description: "Hệ Thống tìm sân Bóng rổ khu vực Hà Nội",
  },

  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Cầu Lông",
    src: "/pitch",

    description: "Tìm sân và Club Cầu Lông khu vực Hà Nội",
  },
  {
    color: "purple",
    icon: FaVolleyballBall,
    title: "Bóng Chuyền",
    src: "/pitch",
    description: "Tìm sân và Club Bóng Chuyền khu vực Hà Nội",
  },

  {
    color: "cyan",
    icon: IoMdTennisball,
    title: "Sân Tennis",
    src: "/pitch",
    description: "Tìm sân Tennis khu vực Hà Nội",
  },
  {
    color: "blue",
    icon: TbYoga,
    title: "Club Gym",
    src: "/pitch",

    description: "Phòng Gym khu vực Hà Nội",
  },
  {
    color: "teal",
    icon: TbYoga,
    title: "Club Yoga",
    src: "/pitch",

    description: "Tìm phòng và Club Yoga khu vực Hà Nội",
  },
  {
    color: "pink",
    icon: TbYoga,
    title: "Club Võ Thuật",
    src: "/pitch",

    description: "Tìm Club võ thuật khu vực Hà Nội",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
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
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color, src }, key) => (
      <Link to={src} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Lĩnh Vực
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <NavListMenu />
      <Typography
        as="a"
        href="timdoi"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          Tìm Kèo
        </ListItem>
      </Typography>
    </List>
  );
}

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <div className="shadow-lg">
      <Navbar className="mx-auto max-w-screen-2xl px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center justify-between ">
            <Link to="/">
              <img src={logo} className="w-24" alt="" />
            </Link>
          </div>
          <div className="w-72">
            <Input label="Tìm Nhanh Sân ..." />
          </div>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <ProfileMenu />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <ProfileMenu />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
