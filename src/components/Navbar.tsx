import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import { UserOutlined, BookOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

const navItems: MenuItem[] = [
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
];

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
  const location = useLocation();

  return (
    <Menu
      selectedKeys={[location.pathname.substring(1)]}
      items={navItems}
      mode="horizontal"
    />
  );
};

export default Navbar;
