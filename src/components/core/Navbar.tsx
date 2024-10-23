import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const Navbar = () => {
  const location = useLocation();

  return (
    <Menu
      selectedKeys={[location.pathname.substring(1)]}
      items={[
        {
          label: <Link to="/users">Users</Link>,
          key: 'users',
          icon: <UserOutlined />
        },
        {
          label: <Link to="/tasks">Tasks</Link>,
          key: 'tasks',
          icon: <BookOutlined />
        }
      ]}
      mode="horizontal"
      style={{ justifyContent: 'center' }}
    />
  );
};

export default Navbar;
