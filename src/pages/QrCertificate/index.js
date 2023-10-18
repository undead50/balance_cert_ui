import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import {
  createQrcertificateAsync,
  deleteQrcertificateAsync,
  fetchQrcertificatesAsync,
  updateQrcertificateAsync,
} from '../../store/slices/qrcertificateSlice';
import { usePDF, Margin } from 'react-to-pdf';
import { EyeOutlined,DeleteOutlined,LinkOutlined } from '@ant-design/icons';
// import { useNotification } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';

const QrcertificateTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [qrcontent, setQrContent] = useState("");


  const navigate = useNavigate();


  // const { callNotification } = useNotification();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { qrcertificates, loading, error } = useSelector(
    (state) => state.qrcertificate
  );

  // Function to handle opening the modal for adding/editing a record


  const handleView = (record) => {
    // alert(record.certificate)
    setContent(parse(record.certificate))
    setQrContent(record.verification_qr)
    setIsModalVisible(true)
  }

  const handleVerfication = (record) => {
    const url = `/verification?verficationID=${record.reference_no}`;
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      // Handle popup blocker or similar issues.
      navigate(url); // Navigate in the current tab as a fallback.
    }
  }

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteQrcertificateAsync(record.id));
    // callNotification('Qrcertificate deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchQrcertificatesAsync());
    console.log(qrcertificates);
  }, []);

  const dataSource = qrcertificates;

  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
    method: "save",
    page: { margin: Margin.MEDIUM },
  });

  const onFinish = (values) => {
    console.log(values);
    values.CreatedBy = userInfo.userName;
    if (editMode) {
      dispatch(updateQrcertificateAsync(values));
      // callNotification('Qrcertificate Edited Successfully', 'success');
    } else {
      dispatch(createQrcertificateAsync(values));
      // callNotification('Qrcertificate Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'reference_no',
      dataIndex: 'reference_no',
      key: 'reference_no',
    },
    {
      title: 'branch_code',
      dataIndex: 'branch_code',
      key: 'branch_code',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (text === 'C') {
          return <Tag color="green">Created</Tag>;
        } else {
          return text; // Display the status as it is for other values
        }
      },
    },
    {
      title: 'created_by',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
          <Button onClick={() => handleView(record)}><EyeOutlined /></Button>
          <Button onClick={()=> handleVerfication(record)}><LinkOutlined /></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ justifyContent: 'center', display: 'flex', textDecoration: 'underline' }}>(QR certificate Report)</h2>
      <Table dataSource={dataSource} columns={columns} />

      {/* Modal for adding/editing a record */}
      <Modal

        width={900}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose={true}
      >
        <Button type="primary" style={{ marginTop: '5px', marginBottom: '9px' }} shape="round" onClick={() => toPDF()}>
          Download PDF
        </Button>
        <div style={{
          border: '2px solid #0074d9',      // Border width and color
          borderRadius: '10px',               // Rounded corners
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Shadow
          background: '#f0f0f0',             // Background color
          padding: '20px',                   // Padding inside the div
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

          </div>
          <div className="sun-editor-editable" style={{ margin: 0, padding: 0 }} ref={targetRef}>
            <br />
            <div>
              <img src={`data:image/png;base64,${qrcontent}`} style={{ height: 'auto',width:'10%', marginLeft: '3%' }} alt="Base64 Image" />
              <div style={{ marginTop: '-14%' }}>{content}</div>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default QrcertificateTable;