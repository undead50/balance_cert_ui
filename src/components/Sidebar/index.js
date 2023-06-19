import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function SideBard() {
  return (
    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to={'/'}>Dashboard</Link>
      </Menu.Item>
      {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to={'/createAudit'}>Create Audit Request</Link>
      </Menu.Item> */}
      {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
        <Link to={'/info'}>Option 2</Link>
      </Menu.Item> */}
      <SubMenu key="sub1" icon={<UserOutlined />} title="Audit">
        <Menu.Item key="4"><Link to = {'/createAudit'}>Create Audit</Link></Menu.Item>
        <Menu.Item key="5"><Link to = {'/indexAudit'}>List Audit</Link></Menu.Item>
        <Menu.Item key="6">User 3</Menu.Item>
      </SubMenu>
      {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="7">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu> */}
      {/* <Menu.Item key="9" icon={<FileOutlined />} /> */}
    </Menu>
  );
}

export default SideBard;
