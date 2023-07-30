import { Tag } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';


function Dashboard() { 
    
    const { userInfo } = useSelector((state) => state.user);

    const content = <>
        <h1>Dasboard</h1>
        <p><Avatar size="small" icon={<UserOutlined />} />  <Tag color="green" size="large">  { userInfo.employeeName}</Tag></p>
    </>
    return (content);
}

export default Dashboard;