import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
const { Content, Footer, Sider } = Layout;
import { AppstoreOutlined, SolutionOutlined, PieChartOutlined, HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';
import FsportLogo from '../assets/img/sport-bg.png';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/Admin/Header/Header';
import { routes } from '~/routes';
import ModalViewCreatePitch from '~/pages/Admin/Dashboard/ModalViewCreatePitch';
import { getUserPitch } from '~/api/pitch';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link className="text-[#fff]" to={routes.admin_pitch}>
      Thống kê
    </Link>,
    'sub1',
    <PieChartOutlined />
  ),
  getItem('Pitch', 'sub2', <AppstoreOutlined />, [
    getItem(
      <Link className="text-[#fff]" to={routes.pitch_admin}>
        Pitch List
      </Link>,
      '3'
    ),
  ]),
  getItem(
    <Link className="text-[#fff]" to={routes.payment_admin}>
      Payment
    </Link>,
    'sub5',
    <SolutionOutlined />
  ),
  getItem(
    <Link className="text-[#fff]" to={routes.booking_admin}>
      Booking
    </Link>,
    'sub6',
    <SolutionOutlined />
  ),
  getItem('Service', 'sub8', <ProfileOutlined />, [
    getItem(
      <Link className="text-[#fff]" to={routes.service_admin}>
        Service List
      </Link>,
      '8'
    ),
  ]),
  getItem('Children_pitch', 'sub9', <ProfileOutlined />, [
    getItem(
      <Link className="text-[#fff]" to={routes.childrenpitch_admin}>
        Children Pitch List
      </Link>,
      '9'
    ),
  ]),
  getItem('Ca Sân', 'sub10', <ProfileOutlined />, [
    getItem(
      <Link className="text-[#fff]" to={routes.shift_admin}>
        Danh Sách Ca
      </Link>,
      '10'
    ),
    getItem(
      <Link className="text-[#fff]" to={routes.shift_admin_management}>
        Quản Lý Ca
      </Link>,
      '11'
    ),
  ]),
];
const AdminPitchLayout = () => {
  const [current, setCurrent] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key);
  };

  const fetchUserByPitch = async () => {
    const res = await getUserPitch();
    if (res.status === 200) {
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
        <div
          style={{
            margin: 16,
            textAlign: 'center',
          }}
        >
          <Link to={routes.admin_pitch}>
            <img src={FsportLogo} alt="Logo" style={{ width: '100%' }} />
          </Link>
        </div>

        <Menu
          theme={'dark'}
          onClick={onClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          style={{ color: '#fff !important' }}
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderAdmin />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '12px 0' }}
            items={[
              {
                href: '/',
                title: <HomeOutlined />,
              },
              {
                href: '/admin',
                title: (
                  <>
                    <UserOutlined />
                    <span>Quản trị</span>
                  </>
                ),
              },
              {
                title: 'Thống kê',
              },
            ]}
          />
          <main style={{ marginTop: 25 }}>
            <Outlet />
          </main>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Design ©2023 Created by He</Footer>
      </Layout>
      {isModalOpen && <ModalViewCreatePitch />}
    </Layout>
  );
};

export default AdminPitchLayout;
