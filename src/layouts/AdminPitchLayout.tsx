import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/Admin/Header/Header';
import { routes } from '~/routes';
import ModalViewCreatePitch from '~/pages/Admin/Dashboard/ModalViewCreatePitch';
import { getUserPitch } from '~/api/pitch';

const AdminPitchLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => {
    setOpen(value);
  };
  const fetchUserByPitch = async () => {
    const res = await getUserPitch();
    if (res.data.statusCode === 200) {
      localStorage.setItem('pitch', JSON.stringify(res.data.data));
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    fetchUserByPitch();
  }, []);
  return (
    <>
      <HeaderAdmin />
      <div className="flex">
        <Card className="h-[90vh] w-1/6 p-4 shadow-2xl mt-1 overflow-auto fixed left-0 ">
          <div className="p-2">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Tìm Kiếm..." crossOrigin={undefined} />
          </div>
          <List>
            <Accordion open={open === 1}>
              <Link to={routes.admin_pitch} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 1}>
                  <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Thống Kê
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 2}>
              <Link to={routes.pitch_admin} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Sân Bóng
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 3}>
              <Link to={routes.payment_admin} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Hóa Đơn
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 4}>
              <Link to={routes.booking_admin} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 4}>
                  <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Lịch Sử
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 5}>
              <Link to={routes.service_admin} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 5}>
                  <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Dịch Vụ
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 6}>
              <Link to={routes.childrenpitch_admin} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 6}>
                  <AccordionHeader onClick={() => handleOpen(6)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                        />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Sân Con
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <Accordion open={open === 7}>
              <Link to={routes.shift_admin_management} className="flex items-center gap-2">
                <ListItem className="p-0" selected={open === 7}>
                  <AccordionHeader onClick={() => handleOpen(7)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Ca Sân
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Link>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <Link to={routes.home}>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </ListItemPrefix>
                Về Trang Chủ
              </ListItem>
            </Link>
          </List>
        </Card>
        <div className="w-5/6 mt-2 px-4 h-[85vh] overflow-auto absolute right-0">
          <Outlet />
        </div>
      </div>
      {isModalOpen && <ModalViewCreatePitch />}
    </>
  );
};

export default AdminPitchLayout;
