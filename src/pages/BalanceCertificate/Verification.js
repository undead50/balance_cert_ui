import React, { useEffect,useState } from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import './VerificationDetails.css'; // Create a separate CSS file
import { CheckOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCertificateByIdAsync } from '../../store/slices/certificateSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;


const VerificationDetails = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstEffectComplete, setFirstEffectComplete] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { verfication_certificate, error, certificate_loading } = useSelector(
        (state) => state.certificate
    );
    const certificateData = verfication_certificate.length !== 0 ? verfication_certificate[0] : [];
    const verficationID = queryParams.get('verficationID');

    useEffect(() => {
        if (verficationID) {
            dispatch(fetchCertificateByIdAsync(verficationID))
        } else {
            window.location.href = 'https://www.ctznbank.com/';
        }
        setFirstEffectComplete(true);
        return () => {
            window.location.href = 'https://www.ctznbank.com/';
          };
    }, [])
    // Second useEffect runs when the first effect is complete
    // Second useEffect runs when the first effect is complete
    return (
        <Card title={
            <div className="centered-header">
                <img src="../images/citizens-logo.png" alt="Logo" className="logo" />
                <Tag icon={<CheckOutlined />} className="medium-tag" color="#0067b2" style={{ marginTop: 5, marginBottom: 7 }}> Verified Successfully</Tag>
            </div>
        }
            className="custom-card"
        >
            <Space direction="vertical" className="centered-content">
                <Text strong>Reference Number</Text>
                <Text>{certificateData.length === 0 ? null : certificateData.reference_no }</Text>

                <Text strong>Account Name</Text>
                <Text>{certificateData.length === 0 ? null :certificateData.certificate_json.ACCOUNT_NAME }</Text>

                <Text strong>Issued Date</Text>
                <Text>{certificateData.length === 0 ? null :certificateData.certificate_json.ISSUE_DATE }</Text>

                <Text strong>Has balance equivalent to</Text>
                <Text>{certificateData.length === 0 ? null :certificateData.certificate_json.EQU_FCRNCY} { certificateData.length === 0 ? null :certificateData.certificate_json.BALANCE_FCY}</Text>

                <Text strong>As on</Text>
                <Text>{ certificateData.length === 0 ? null :certificateData.certificate_json.BAL_AS_ON_DATE}</Text>
            </Space>
        </Card>
    );
};

export default VerificationDetails;