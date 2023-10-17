import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  Row,
  Col,
  Card,
  Space,
  Modal,
  Descriptions,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCertificatesAsync,
  resetStateCertificate,
} from '../../store/slices/certificateSlice';
import { EyeOutlined } from '@ant-design/icons';
import './index.css';
import { fetchTemplatesAsync } from '../../store/slices/templateSlice';
import { useForm } from 'antd/lib/form/Form';

const Step1Form = () => {
  const { certificates, certificate_loading } = useSelector((state) => state.certificate);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const certificateData = certificates.length !== 0 ? certificates[0] : [];
  
  const [form] = useForm();

  useEffect(() => {
    dispatch(fetchTemplatesAsync());
  }, []);

  const handleView = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: 'SOL_ID_CERTIFICATE_ISSUE',
      dataIndex: 'SOL_ID_CERTIFICATE_ISSUE',
      key: 'SOL_ID_CERTIFICATE_ISSUE',
    },
    { title: 'REFERENCE_NO', dataIndex: 'REFERENCE_NO', key: 'REFERENCE_NO' },
    {
      title: 'CERT_ISSUING_BRANCH',
      dataIndex: 'CERT_ISSUING_BRANCH',
      key: 'CERT_ISSUING_BRANCH',
    },
    {
      title: 'CERTIFICATE_TYPE',
      dataIndex: 'CERTIFICATE_TYPE',
      key: 'CERTIFICATE_TYPE',
      render: (text) => (text === 'C' ? 'Combined' : 'Single'),
    },
    {
      title: 'ACCOUNTNUMBER',
      dataIndex: 'ACCOUNTNUMBER',
      key: 'ACCOUNTNUMBER',
    },
    {
      title: 'ACCOUNT_SOL_ID',
      dataIndex: 'ACCOUNT_SOL_ID',
      key: 'ACCOUNT_SOL_ID',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleView(record)}>
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // alert(values.referenceNumber)
    dispatch(fetchCertificatesAsync(values.referenceNumber));
  };

  // useEffect(() => {
  //     dispatch(resetStateCertificate())

  // }, [])

  const handleReset = () => {
    dispatch(resetStateCertificate());
    form.resetFields();
    
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'underline',
          }}
        >
          <h1>Balance Certificate Issuance Request</h1>
        </div>

        <Row gutter={12}>
          {/* <Col span={4}>
            <Form.Item label="Account Number" name="accountNumber">
              <Input placeholder="Enter Account Number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Issued Date" name="issuedDate">
              <DatePicker />
            </Form.Item>
          </Col> */}
          <Col span={7}>
            <Form.Item label="Reference Number(Check Certificate Validity)" name="referenceNumber" rules={[
              {
                required: true,
                message: 'Please enter the Reference Number',
              },
            ]}>
              <Input placeholder="Enter Reference Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" shape="round" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table dataSource={certificates} columns={columns} loading={certificate_loading} />
      <Modal
        title="Certificate Details"
        width={600}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="custom-scrollbar">
          <Card>
            {certificates.length !== 0 ? (
              <Descriptions column={1}>
                <Descriptions.Item
                  label={
                    <span className="bold-label">SOL_ID_CERTIFICATE_ISSUE</span>
                  }
                >
                  {certificateData['SOL_ID_CERTIFICATE_ISSUE']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">REFERENCE_NO</span>}
                >
                  {certificateData['REFERENCE_NO']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">CERTIFICATE_TYPE</span>}
                >
                  {certificateData['CERTIFICATE_TYPE']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">RATE</span>}
                >
                  {certificateData['RATE']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span className="bold-label">CERT_ISSUING_BRANCH</span>
                  }
                >
                  {certificateData['CERT_ISSUING_BRANCH']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">CIF_ID</span>}
                >
                  {certificateData['CIF_ID']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">ACCOUNTNUMBER</span>}
                >
                  {certificateData['ACCOUNTNUMBER']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">ACCOUNT_SOL_ID</span>}
                >
                  {certificateData['ACCOUNT_SOL_ID']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">BRANCH_ACCT_OPENED</span>}
                >
                  {certificateData['BRANCH_ACCT_OPENED']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">ACCOUNT_NAME</span>}
                >
                  {certificateData['ACCOUNT_NAME']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">ISSUE_DATE</span>}
                >
                  {certificateData['ISSUE_DATE']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">BAL_AS_ON_DATE</span>}
                >
                  {certificateData['BAL_AS_ON_DATE']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">BALANCE_NPR</span>}
                >
                  {certificateData['BALANCE_NPR']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">BALANCE_FCY</span>}
                >
                  {certificateData['BALANCE_FCY']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">LCHG_USER_ID</span>}
                >
                  {certificateData['LCHG_USER_ID']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">LCHG_TIME</span>}
                >
                  {certificateData['LCHG_TIME']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">EQU_CRNCY</span>}
                >
                  {certificateData['EQU_CRNCY']}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span className="bold-label">EQU_FCRNCY</span>}
                >
                  {certificateData['EQU_FCRNCY']}
                </Descriptions.Item>
              </Descriptions>
            ) : null}
          </Card>
        </div>
      </Modal>
    </Card>
  );
};

export default Step1Form;
