import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  PieChartOutlined,
  UserOutlined,
  SettingTwoTone,
  TeamOutlined,
  SnippetsTwoTone,
} from '@ant-design/icons';
import './index.css'

const { SubMenu } = Menu;

function SideBard() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    // <div className='custom-scrollbar-sidebar'>
    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to={'/'}>Dashboard</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="Balace Certificate">
        {/* <Menu.Item key="4"><Link to = {'/createAudit'}>Create Audit</Link></Menu.Item>
        <Menu.Item key="5"><Link to = {'/indexAudit'}>List Audit</Link></Menu.Item> */}
        {/* <Menu.Item key="6"><Link to={'/riskassessment'}>Risk Assessment</Link></Menu.Item> */}
        <Menu.Item key="2">
          <Link to={'/balcert-search'}>Issue Certificate</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={'/assessmentindex'}>Certificate Status</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Report">
        <Menu.Item key="4">Team 1</Menu.Item>
        <Menu.Item key="5">Team 2</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<TeamOutlined />} title="Settings">
        <Menu.Item key="6">
        <Link to={'/template'}>Template</Link>
        </Menu.Item>
        <Menu.Item key="7">Team 2</Menu.Item>
      </SubMenu>
      {/* <Menu.Item key="9" icon={<FileOutlined />} /> */}
      {/* {userInfo.isSuperAdmin === true && (
        <SubMenu key="sub3" icon={<SnippetsTwoTone />} title="Report">
          <Menu.Item key="13">
            <Link to={'/report'}>Risk Report</Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to={'/riskRankingReport'}>Risk Ranking</Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to={'/riskStatus'}>Risk Status</Link>
          </Menu.Item>
        </SubMenu>
      )} */}

      
      </Menu>
      // </div>
  );
}

export default SideBard;
