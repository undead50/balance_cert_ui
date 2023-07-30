import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  PieChartOutlined,
  UserOutlined,
  SettingTwoTone,
} from '@ant-design/icons';
import { useEffect } from 'react';

const { SubMenu } = Menu;

function SideBard() {

  const { userInfo } = useSelector((state) => state.user);

 


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
      <SubMenu key="sub1" icon={<UserOutlined />} title="Risk Assesment">
        {/* <Menu.Item key="4"><Link to = {'/createAudit'}>Create Audit</Link></Menu.Item>
        <Menu.Item key="5"><Link to = {'/indexAudit'}>List Audit</Link></Menu.Item> */}
        <Menu.Item key="6"><Link to={'/riskassessment'}>Risk Assessment</Link></Menu.Item>
        <Menu.Item key="9"><Link to={'/assessmentindex'}>Assessment Status</Link></Menu.Item>
      </SubMenu>
      {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="7">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu> */}
      {/* <Menu.Item key="9" icon={<FileOutlined />} /> */}
      { userInfo.isSuperAdmin === true && ( <SubMenu key="sub2" icon={<SettingTwoTone />} title="Settings">
        {/* <Menu.Item key="4"><Link to = {'/createAudit'}>Create Audit</Link></Menu.Item>
        <Menu.Item key="5"><Link to = {'/indexAudit'}>List Audit</Link></Menu.Item> */}
        <Menu.Item key="7"><Link to={'/categoryIndex'}>Category</Link></Menu.Item>
        <Menu.Item key="8"><Link to={'/questionIndex'}>Qutestions</Link></Menu.Item>
        <Menu.Item key="10"><Link to={'/previlageIndex'}>Previlage</Link></Menu.Item>
        <Menu.Item key="11"><Link to={'/markingIndex'}>Marks</Link></Menu.Item>
      </SubMenu>)}
     
    </Menu>
  );
}

export default SideBard;
