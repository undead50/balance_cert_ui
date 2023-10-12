import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import './VerificationDetails.css'; // Create a separate CSS file
import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const VerificationDetails = () => {
    return (
        <Card title={
            <div className="centered-header">
                <img src="./images/citizens-logo.png" alt="Logo" className="logo" />
                <Tag icon={<CheckOutlined />} className="medium-tag" color="#0067b2" style={{marginTop:5,marginBottom:7}}> Verified Successfully</Tag>
            </div>
        }
            className="custom-card"
        >
            <Space direction="vertical" className="centered-content">
                <Text strong>Reference Number</Text>
                <Text>SAN/77/1025/2079/80</Text>

                <Text strong>Account Name</Text>
                <Text>BASANDHARA BASEL</Text>

                <Text strong>Issued Date</Text>
                <Text>27-Jun-2023</Text>

                <Text strong>Has balance equivalent to</Text>
                <Text>CAD 55280.4562</Text>

                <Text strong>As on</Text>
                <Text>2023-06-26</Text>
            </Space>
        </Card>
    );
};

export default VerificationDetails;