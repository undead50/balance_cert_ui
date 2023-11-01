import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Space,DatePicker,QRCode  } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import {
  createQrcertificateAsync,
  deleteQrcertificateAsync,
  fetchQrcertificatesAsync,
  updateQrcertificateAsync,
} from '../../store/slices/qrcertificateSlice';
import { usePDF, Margin } from 'react-to-pdf';
import { EyeOutlined,DeleteOutlined,LinkOutlined,SearchOutlined,FileExcelOutlined } from '@ant-design/icons';
// import { useNotification } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { encrypt,decrypt } from '../../hooks/crypto';
import * as XLSX from 'xlsx';
import { fetchBranchsAsync } from '../../store/slices/branchSlice';


const { RangePicker } = DatePicker;


const decodebase64Image = (base64ImageData) => {
  // Decode the base64 image data using the atob function
  const decodedImageData = base64ImageData
  
  // Create a Uint8Array from the decoded image data
  const uint8Array = new Uint8Array(decodedImageData.length);
  for (let i = 0; i < decodedImageData.length; i++) {
    uint8Array[i] = decodedImageData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: 'image/png' });

  // Create a URL for the Blob
  const imageUrl = URL.createObjectURL(blob);

  alert(imageUrl)

  return imageUrl
}


const QrcertificateTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [qrcontent, setQrContent] = useState("");

  const { branchs } = useSelector((state) => state.branch)


  const exportToExcel = () => {
  
    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(dataSource.map(item => {
      // Customize the data format if needed
      return {
        created_at: item.created_at,
        reference_no: item.reference_no,
        branchDesc: item.branchDesc,
        status:item.status,
        created_by: item.created_by
        // Add more columns as needed
      };
    }));

    // const title = 'Risk Ranking Report'
    // // Add a title row
    // const titleRow = ['Title: ', title]; // Customize as needed
    // XLSX.utils.sheet_add_aoa(ws, [titleRow], { origin: 0 });

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook to a file
    XLSX.writeFile(wb, `myfile.xlsx`);
  };


  const navigate = useNavigate();


  // const { callNotification } = useNotification();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { qrcertificates, loading, error } = useSelector(
    (state) => state.qrcertificate
  );

  // Function to handle opening the modal for adding/editing a record

  	  
  const onSearch = (values) => {

    
    let startDate;
    let endDate;
    values.dateRange.map((data, index) => {
      if (index === 0) {
        startDate = data.format('YYYY-MM-DD')
      } else if (index === 1) {
        endDate = data.format('YYYY-MM-DD')
      }
    })

    let data
    userInfo.isSuperAdmin ? data = { startDate, endDate } : data = { startDate, endDate, branch_code: userInfo.solId }
    dispatch(fetchQrcertificatesAsync(data))
  }


  const handleView = (record) => {
    // alert(record.certificate)
    setContent(parse(record.certificate))
    setQrContent(record.verification_qr)
    setIsModalVisible(true)
  }

  const handleVerfication = (record) => {
    const hashedVerificationID = encrypt(record.reference_no)
    const url = `/verification?verficationID=${encodeURIComponent(hashedVerificationID)}`;
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

    let data

    userInfo.isSuperAdmin ? data = {} : data = { branch_code: userInfo.solId}
    // userInfo.isSuperAdmin === true ? dispatch(fetchRisksAsync()) : dispatch((fetchRisksAsync({branch_code: userInfo.solId})));

    dispatch(fetchQrcertificatesAsync(data));
    console.log(qrcertificates);
    dispatch(fetchBranchsAsync())
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

  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Reference No',
      dataIndex: 'reference_no',
      key: 'reference_no',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search reference_no"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={confirm}
            icon={ <SearchOutlined/>}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => {clearFilters(); setSearchText('');}} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
       ),
      onFilter: (value, record) =>
        record.reference_no
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      title: 'Branch Description',
      dataIndex: 'branchDesc',
      key: 'branchDesc',
      filters:
        branchs.map((branch) => {
          return {
            text: branch.branchDesc,
            value: branch.branchDesc
          }
        }),
      filterSearch: true,
      onFilter: (value, record) => record.branchDesc === value,
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
      <Button onClick={exportToExcel} type="primary" shape='round'>
        Export excel<FileExcelOutlined />
      </Button>
      <br />
      <br/>
      <Form form={form} onFinish={onSearch} layout="inline">
        <Form.Item
          name="dateRange"
          label="Select Date Range"
          rules={[
            { type: 'array', required: true, message: 'Please select a date range' },
          ]}
        >
          <RangePicker format="YYYY-MM-DD" style={{ width: 300 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="circle" htmlType="submit"><SearchOutlined /></Button>
        </Form.Item>
      </Form>
      <br />
      <br />
	  
      
      <Table dataSource={dataSource} columns={columns} loading={loading} />

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
              {/* <img src={`data:image/png;base64,${qrcontent}`} style={{ height: 'auto',width:'10%', marginLeft: '3%' }} alt="Base64 Image" /> */}
              <div style={{height: 'auto',width:'13%', marginLeft: '3%'}}>
              <QRCode 
                  size='115'
                type="svg" 
                value={qrcontent}
                />
                </div>
              <div style={{ marginTop: '-14%' }}>{content}</div>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default QrcertificateTable;