import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    createReportAsync,
    deleteReportAsync,
    fetchReportsAsync,
    updateReportAsync,
} from '../../store/slices/reportSlice';
import { EyeOutlined } from '@ant-design/icons';
// import { useNotification } from '../../hooks/index';
import moment from 'moment'; // Import moment here

const { RangePicker } = DatePicker;

const ReportTable = () => {
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


    const { reports, loading, error } = useSelector(
        (state) => state.report
    );

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
        dispatch(fetchReportsAsync());
        console.log(reports);
    }, []);

    const dataSource = reports;

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

    const columns = [

        {
            title: 'branch_code',
            dataIndex: 'branch_code',
            key: 'branch_code',
        },



        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'APPROVED', value: 'APPROVED' },
                { text: 'REVIEWED', value: 'REVIEWED' },
                { text: 'CREATED', value: 'CREATED' }
              ],
            filterSearch: false,
            onFilter: (value, record) => record.status === value,
            render: (status) => {
              let color =
                status === 'APPROVED'
                  ? 'green'
                  : status === 'REVIEWED'
                  ? 'yellow'
                  : status === 'CREATED'
                              ? 'blue'
                              :status === 'DRAFT' ? 'pink'
                  
                  : 'red';
              return <Tag color={color}>{status}</Tag>;
            },
          },
        {
            title: 'Risk Raiting',
            dataIndex: 'riskRating',
            key: 'riskRating',
            filters: [
                { text: 'High', value: 'High' },
                { text: 'Medium', value: 'Medium' },
                { text: 'Low', value: 'Low' }
              ],
            filterSearch: false,
            onFilter: (value, record) => record.riskRating === value,
            render: (_, record) => (
                record.riskRating === 'Low' ? <Tag color='green'>Low</Tag> : record.riskRating === 'High' ? <Tag color='red'>High</Tag> : <Tag color='yellow'>Medium</Tag>
            ),
        },



        {
            title: 'Average Score (%)',
            dataIndex: 'sumOfWeightageAverageScore',
            key: 'sumOfWeightageAverageScore',
            sorter: (a, b) => a.sumOfWeightageAverageScore - b.sumOfWeightageAverageScore,
        },


        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            filters: [
              { text: 'Today', value: 'today' },
              { text: 'Last 7 Days', value: 'last7days' },
              { text: 'Last 30 Days', value: 'last30days' },
              { text: 'Custom Range', value: 'custom' },
            ],
            onFilter: (value, record) => filterCreatedAt(value, record.created_at),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div style={{ padding: 8 }}>
                <RangePicker
                  value={selectedKeys[0]}
                  onChange={(dates) => setSelectedKeys([dates])}
                  onOk={() => confirm()}
                  onCancel={() => clearFilters()}
                />
              </div>
            ),
            filterIcon: (filtered) => (
              <i
                className={`ant-table-filter-icon ant-table-filter-icon${filtered ? '-active' : ''}`}
              />
            ),
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            // The sorter function compares date values to enable sorting by date
          },


        



        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}><EyeOutlined /></Button>
                </Space>
            ),
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
            <h2 style={{justifyContent:'center',display:'flex'}}>Branch Wise Summary Report</h2>
            <br/>
            <Table dataSource={dataSource} columns={columns} />

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
        </div>
    );
};

export default ReportTable;