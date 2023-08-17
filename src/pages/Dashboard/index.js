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

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboards } = useSelector((state) => state.dashboard);

  const { userInfo } = useSelector((state) => state.user);

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
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} style={{ backgroundColor: '#F5F5F5' }}>
            <Statistic
              title="APPROVED"
              value={dashboards.map((dashboard) => {
                if (dashboard.STATUS === 'APPROVED') {
                  return dashboard.count;
                }
              })}
              precision={0}
              valueStyle={{
                color: '#3f8600',
              }}
              suffix=""
            />
          </Card>
          <Card
            bordered={false}
            style={{ marginTop: '10px', backgroundColor: '#F5F5F5' }}
          >
            <Statistic
              title="REJECTED"
              value={dashboards.map((dashboard) => {
                if (dashboard.STATUS === 'REJECTED') {
                  return dashboard.count;
                }
              })}
              precision={0}
              valueStyle={{
                color: '#3f8600',
              }}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ backgroundColor: '#F5F5F5' }}>
            <Statistic
              title="INITIATED"
              value={dashboards.map((dashboard) => {
                if (dashboard.STATUS === 'INITIATED') {
                  return dashboard.count;
                }
              })}
              precision={0}
              valueStyle={{
                color: '#cf1322',
              }}
            />
          </Card>
          <Card
            bordered={false}
            style={{ marginTop: '10px', backgroundColor: '#F5F5F5' }}
          >
            <Statistic
              title="DRAFT"
              value={dashboards.map((dashboard) => {
                if (dashboard.STATUS === 'DRAFT') {
                  return dashboard.count;
                }
              })}
              precision={0}
              valueStyle={{
                color: '#3f8600',
              }}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
