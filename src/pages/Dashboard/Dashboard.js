import { Tag } from "antd";
import { useSelector } from "react-redux";
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Avatar } from 'antd';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchMydashboardsAsync } from "../../store/slices/mydashboardSlice";




const Dashboard = () => { 

  const dispatch = useDispatch();

  // const { dashboards } = useSelector((state) => state.dashboard);
    
  const { userInfo } = useSelector((state) => state.user);

  

  useEffect(() => {
    // dispatch(fetchDashboardsAsync())
  },[])

    return <>
    <h1>Dasboard</h1>
    <p><Avatar size="small" icon={<UserOutlined />} />  <Tag color="green" size="large">  {userInfo.employeeName}</Tag></p>
    <Row gutter={16}>
<Col span={12}>
  <Card bordered={false}  style={{backgroundColor: '#F5F5F5'}}>
    <Statistic
      title="Approved"
      //     value={dashboards.map((dashboard) => {
      //       if (dashboard.STATUS === 'APPROVED') {
      //         return dashboard.count
      //       }
      // })}
          value="2"
          precision={2}
         
      valueStyle={{
        color: '#3f8600',
      }}
      prefix={<ArrowUpOutlined />}
      suffix=""
    />
  </Card>
</Col>
<Col span={12}>
  <Card bordered={false}  style={{backgroundColor: '#F5F5F5'}}>
    <Statistic
      title="Idle"
      value={9.3}
      precision={2}
      valueStyle={{
        color: '#cf1322',
      }}
      prefix={<ArrowDownOutlined />}
      suffix="%"
    />
  </Card>
</Col>
</Row>
</>;
}

export default Dashboard;