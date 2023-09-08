import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createReportAsync,
  deleteReportAsync,
    fetchRiskStatusReportsAsync,
  updateReportAsync,
} from '../../store/slices/reportSlice';
import { EyeOutlined,SearchOutlined,FilePdfOutlined,FileExcelOutlined } from '@ant-design/icons';
// import Spinner  from '../../components/Spinner';
// import { useNotification } from '../../hooks/index';
import moment from 'moment'; // Import moment here
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const { RangePicker } = DatePicker;

const RiskStatus = () => {


    const exportToExcel = () => {
  
        // Create a new worksheet
        const ws = XLSX.utils.json_to_sheet(dataSource.map(item => {
          // Customize the data format if needed
          return {
            branchDesc: item.branchDesc,
            status: item.status,
            noOf: item.noOf,
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
        XLSX.writeFile(wb, `Risk_Status_Report.xlsx`);
      };

    const { riskStatusReport, loading, error } = useSelector(
        (state) => state.report
      );

  const filterCreatedAt = (value, createdDate) => {
    if (value === 'today') {
      const today = moment().startOf('day');
      return moment(createdDate).isSame(today, 'day');
    }

    if (value === 'last7days') {
      const lastWeek = moment().subtract(7, 'days').startOf('day');
      return moment(createdDate).isSameOrAfter(lastWeek, 'day');
    }

    if (value === 'last30days') {
      const lastMonth = moment().subtract(30, 'days').startOf('day');
      return moment(createdDate).isSameOrAfter(lastMonth, 'day');
    }

    if (value === 'custom' && Array.isArray(value)) {
      const startDate = moment(value[0]).startOf('day');
      const endDate = moment(value[1]).endOf('day');
      return moment(createdDate).isBetween(startDate, endDate, 'day', '[]');
    }

    return false;
  };



  
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const {branchs} = useSelector((state)=> state.branch)


  

  // Function to handle opening the modal for adding/editing a record
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    form.setFieldsValue({});
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteReportAsync(record.id));
    // callNotification('Report deleted Successfully', 'success');
  };

  useEffect(() => {
    const data = {
      startDate: undefined,
      endDate: undefined
    }
    dispatch(fetchRiskStatusReportsAsync())
    console.log(branchs);
  }, []);

  const downloadPDF = () => {
    const pdfDefinition = {
      content: [
        {
          text: "Risk Status Report",  // Add the heading here
          style: 'heading',
        },
        {
          table: {
            headerRows: 1,
            widths: columns.map(() => 'auto'),
            body: [
              columns.map(column => ({ text: column.title, style: 'tableHeader' })),
              ...dataSource.map(row => columns.map(column => row[column.dataIndex] || '')),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        heading: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10], // Optional margin
        },
        tableHeader: {
          bold: true,
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(pdfDefinition);
    pdfDocGenerator.download('Risk_Status.pdf');
  };





  const dataSource = riskStatusReport;

  const onFinish = (values) => {
    console.log(values);
    values.CreatedBy = userInfo.userName;
    if (editMode) {
      dispatch(updateReportAsync(values));
      // callNotification('Report Edited Successfully', 'success');
    } else {
      dispatch(createReportAsync(values));
      // callNotification('Report Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const onSearch = (values) => {
    let start_date;
    let end_date;
    values.dateRange.map(( data,index) => {
      if (index === 0) {
        start_date = data.format('YYYY-MM-DD')  
      } else if (index === 1 ) {
        end_date =  data.format('YYYY-MM-DD')  
      }   
    })

    // alert(`${startDate},${endDate}`)
    const data = {
        start_date,
        end_date
    }
    
  }


  const columns = [

    {
      title: 'Branch Description',
      dataIndex: 'branchDesc',
      key: 'branchDesc',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'APPROVED', value: 'APPROVED' },
          { text: 'REVIEWED', value: 'REVIEWED' },
          { text: 'CREATED', value: 'CREATED' },
          { text: 'DRAFT', value: 'DRAFT' },
          {text: 'INITIATED',value: 'INITIATED'}
        ],
        filterSearch: false,
        onFilter: (value, record) => record.status === value,
      },
      {
        title: 'Count',
        dataIndex: 'noOf',
        key: 'noOf',
      },
    
  ];

  return (
    <div>
      {/* <Button
      type="primary"
      onClick={() => handleAdd()}
      style={{ marginBottom: '16px' }}
    >
      Add
    </Button> */}
      <h2 style={{ justifyContent: 'center', display: 'flex',textDecoration:'underline' }}>(Risk Status Report)</h2>
      <Button onClick={downloadPDF} type="primary" shape='round'>
        Export Pdf<FilePdfOutlined />
      </Button>
      &nbsp;&nbsp;
      <Button onClick={exportToExcel} type="primary" shape='round'>
        Export excel<FileExcelOutlined />
      </Button>
      <br />
      <br />
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
          <Button type="primary"  shape="circle"  htmlType="submit"><SearchOutlined /></Button>
        </Form.Item>
      </Form>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns} loading={loading} />

      {/* Modal for adding/editing a record */}
      <Modal
        title={editMode ? 'View Details' : 'Add Record'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          {/* Add form fields here based on your column fields */}

          <Form.Item name="created_at" label="created_at">
            <Input />
          </Form.Item>

          <Form.Item name="branch_code" label="branch_code">
            <Input />
          </Form.Item>

          <Form.Item name="status" label="status">
            <Input />
          </Form.Item>

          <Form.Item name="sumOfWeightageAverageScore" label="sumOfWeightageAverageScore">
            <Input />
          </Form.Item>

          <Form.Item name="riskRaiting" label="riskRaiting">
            <Input />
          </Form.Item>

          {/* <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editMode ? 'Update' : 'Add'}
                        </Button>
                    </Form.Item> */}
        </Form>
      </Modal>
      {/* {loading && <Spinner />} */}
    </div>

  );
};

export default RiskStatus;