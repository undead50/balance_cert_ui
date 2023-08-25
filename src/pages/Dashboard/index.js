import { Tag } from 'antd';
import { useSelector } from 'react-redux';
import {
  ArrowDownOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDashboardsAsync } from '../../store/slices/dashboardSlice';
import CountUp from 'react-countup';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboards } = useSelector((state) => state.dashboard);

  const { userInfo } = useSelector((state) => state.user);
  const formatter = (num) => <CountUp end={num.toString().replace(/,/g, '')} />;

  useEffect(() => {
    dispatch(fetchDashboardsAsync());
  }, []);

  return (
    <>
      <h1>Dasboard</h1>
      <p>
        <Avatar size="small" icon={<UserOutlined />} />{' '}
        <Tag color="green" size="large">
          {' '}
          {userInfo.employeeName}
        </Tag>
      </p>
      <Row gutter={12}>
        <Col span={6}>
          <Card style={{backgroundColor:'#84D2B5'}}>
          <Statistic title="APPROVED" value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'APPROVED') {
              return dashboard.count;
            }

          })} formatter={formatter} />
            </Card>
        </Col>
        <Col span={6}>
          <Card style={{backgroundColor:"#4285B4"}}>
          <Statistic title="INITIATED" value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'INITIATED') {
              return dashboard.count;
            }
          })} precision={2} formatter={formatter} />
            </Card>
        </Col>
      </Row>
      <Row gutter={12}>
      <Col span={6}>
          <Card style={{marginTop:'10px',backgroundColor:'#FFC107'}}>
          <Statistic title="DRAFT" value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'DRAFT') {
              return dashboard.count;
            }
          })} formatter={formatter} />
            </Card>
        </Col>
        <Col span={6}>
        <Card style={{marginTop:'10px',backgroundColor:'red'}}>
          <Statistic title="REJECTED" value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'REJECTED') {
              return dashboard.count;
            }
          })} precision={2} formatter={formatter} />
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
