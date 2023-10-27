import { MenuProps } from "antd";
import { Layout, Dropdown, Avatar } from "antd";
const { Header } = Layout;
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  
    const items: MenuProps["items"] = [
      // {
      //   label: <a>Tài khoản</a>,
      //   key: "0",
      // },
      {
        label: <Link to={"/"}>Trang chủ</Link>,
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: <a>Đăng xuất</a>,
        key: "3",
      },
    ];
    return (
      <Header style={{ padding: 0, background: "#FFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 18,
              marginLeft: 20,
              fontWeight: 700,
            }}
          >
            Chào mừng đến với trang quản trị!
          </div>
          <div style={{ marginRight: 35 }}>
            <Avatar
              style={{ marginRight: 5, marginBottom: 4 }}
              size={43}
              icon={<UserOutlined />}
            />
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{ fontSize: 21, color: "#000" }} />
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
    );
  };

export default HeaderAdmin;
