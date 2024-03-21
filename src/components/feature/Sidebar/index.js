import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'; // Import additional icon for the modal
import Link from 'antd/es/typography/Link';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { sidebarPaths } from '../../../utils/constants/sidebarPaths';

import './sidebar.scss';
import { signOut } from '@aws-amplify/auth';

const { Sider } = Layout;
const { confirm } = Modal;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState(['1']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const activeTab = sidebarPaths.find(el => el.path === window.location.pathname);
    if (activeTab) {
      setActive([activeTab.key]);
    }
  }, []);

  const showConfirm = () => {
    confirm({
      title: 'Do you want to sign out?',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to log out from your account.',
      onOk() {
        console.log('Sign out');
        signOut()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const siderStyle = {
    height: '100vh',
    position: 'fixed',
    left: 0,
    zIndex: 1,
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={siderStyle} className="sider-bar">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, display: 'block', marginLeft: 'auto' }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu theme="dark" selectedKeys={active} mode="inline" inlineCollapsed={collapsed}>
        {sidebarPaths.map(item =>
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.path}>{item.name}</Link>
          </Menu.Item>
        )}
        <Menu.Item key="signOut" onClick={showConfirm} icon={<ExclamationCircleOutlined />}>
          Sign Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
