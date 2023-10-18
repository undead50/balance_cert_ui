import { Tag,Image } from 'antd';
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
import './index.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboards } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const formatter = (num) => <CountUp end={num.toString().replace(/,/g, '')} />;

  const handleClick = (param) => {
    navigate(`/assessmentindex/${param}`);
  }

  useEffect(() => {
    let branchCode = userInfo.solId;
    if (userInfo.isSuperAdmin) {
      dispatch(fetchDashboardsAsync(null));  
    } else {
      dispatch(fetchDashboardsAsync(branchCode));
    }
    
  }, []);

  const base64Image = `data:image/png;base64,${userInfo.image}`;

  return (
    <>
      <h1>Dasboard</h1>
      <Image src={base64Image} alt="Base64 Image" /> 
      <p>
        <Avatar size="small" icon={<UserOutlined />} />{' '}
        <Tag color="green" size="large">
          {' '}
          {userInfo.employeeName}
        </Tag>
      </p>
      {/* <Row gutter={12}>
        <Col span={6}>
          <Card style={{backgroundColor:'#84D2B5'}} onClick={() => handleClick('APPROVED')} className="hoverable-card">
          <Statistic title="APPROVED" style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'APPROVED') {
              return dashboard.count;
            }

          })} formatter={formatter} />
            </Card>
        </Col>
        <Col span={6}>
          <Card style={{backgroundColor:"#4285B4"}} onClick={() => handleClick('INITIATED')} className="hoverable-card">
          <Statistic title="PENDING" style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'INITIATED') {
              return dashboard.count;
            }
          })} precision={2} formatter={formatter} />
            </Card>
        </Col>
      </Row>
      <Row gutter={12}>
      <Col span={6}>
          <Card style={{marginTop:'10px',backgroundColor:'#FFC107'}} onClick={() => handleClick('DRAFT')} className="hoverable-card">
          <Statistic title="DRAFT"  style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'DRAFT') {
              return dashboard.count;
            }
          })} formatter={formatter} />
            </Card>
        </Col>
        <Col span={6}>
        <Card style={{marginTop:'10px',backgroundColor:'red'}} onClick={() => handleClick('REJECTED')} className="hoverable-card">
          <Statistic title="REJECTED"  style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'REJECTED') {
              return dashboard.count;
            }
          })} precision={2} formatter={formatter} />
            </Card>
        </Col>
      </Row>
      <Row gutter={12}>
      <Col span={6}>
          <Card style={{marginTop:'10px',backgroundColor:'#28A745'}} onClick={() => handleClick('CREATED')} className="hoverable-card">
          <Statistic title="SUBMITED" style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'CREATED') {
              return dashboard.count;
            }
          })} formatter={formatter} />
            </Card>
        </Col>
        <Col span={6}>
          <Card style={{marginTop:'10px',backgroundColor:'#D2D6DE'}} onClick={() => handleClick('REVIEWED')} className="hoverable-card">
          <Statistic title="REVIEWED" style={{fontWeight:'bold'}} value={dashboards.map((dashboard) => {
            if (dashboard.STATUS === 'REVIEWED') {
              return dashboard.count;
            }
          })} formatter={formatter} />
            </Card>
        </Col>    

      </Row> */}
    </>
  );
};

export default Dashboard;
