import { Tag } from "antd";
import { useSelector } from "react-redux";
import { ArrowDownOutlined, ArrowUpOutlined,UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic,Avatar } from 'antd';



function Dashboard() { 
    
    const { userInfo } = useSelector((state) => state.user);

    const content = <>
        <h1>Dasboard</h1>
        <p><Avatar size="small" icon={<UserOutlined />} />  <Tag color="green" size="large">  {userInfo.employeeName}</Tag></p>
        <Row gutter={16}>
    <Col span={12}>
      <Card bordered={false}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{
            color: '#3f8600',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false}>
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
    </>
    return (content);
}

export default Dashboard;