import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Tag, Space, Card, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import {
  calculateRiskAsync,
  createRiskAsync,
  deleteRiskAsync,
  fetchRisksAsync,
  updateRiskAsync,
} from '../../store/slices/riskSlice';
import { useNotification } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import './index.css';
import AssessmentSummary from './AssessmentSummary';
import CommentModal from './CommentModal ';

const RiskTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [assesmentStatus, setAssessmentStatus] = useState({});
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [commentRecord, setCommentRecord] = useState({});
  const [auditAssessmentRecord, setAuditAssessmentRecord] = useState([]);

  const navigate = useNavigate();
  // const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { risks, loading, error } = useSelector((state) => state.risk);

  const { questions } = useSelector((state) => state.question);
  const [auditHistoty, setAuditHistory] = useState([]);

  const viewColumns = [
    { title: 'Ref', dataIndex: 'Ref', key: 'Ref' },
    { title: 'Category', dataIndex: 'Category', key: 'Ref' },
    {
      title: 'Observation as per manual/circulars/NRB Directives',
      dataIndex: 'question',
      key: 'question',
    },
    { title: 'Selected', dataIndex: 'Selected', key: 'Selected' },
    { title: 'Explanation of score', dataIndex: 'es', key: 'es' },
  ];

  // Function to handle opening the modal for adding/editing a record
  const handleAction = (record) => {
    setCommentVisible(true);
    setCommentRecord(record);
  };

  const closeComment = () => {
    setCommentVisible(false);
  };

  const data = auditHistoty;

  const handleViewAssessment = (record) => {
    dispatch(calculateRiskAsync(record));
    setVisible(true);
    let auditAssessmentList = [];
    record.created_by !== null
      ? auditAssessmentList.push(`created_by : ${record.created_by}`)
      : console.log('');
    record.reviewed_by !== null
      ? auditAssessmentList.push(
          `reviewed_by : ${record.reviewed_by} ,reviewed_comment: ${record.reviewed_comment}`
        )
      : console.log('');
    record.approved_by !== null
      ? auditAssessmentList.push(
          `approved_by : ${record.approved_by} ,approved_comment: ${record.approved_comment}`
        )
      : console.log('');
    record.rejected_by !== null
      ? auditAssessmentList.push(
          `rejected_by : ${record.rejected_by} ,rejected_comment: ${record.rejected_comment}`
        )
      : console.log('');
    setAuditAssessmentRecord(auditAssessmentList);
  };

  const handleCompleteDraft = () => {
    // alert(assesmentStatus.id);
    navigate(`/riskassessment/${assesmentStatus.id}`);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteRiskAsync(record.id));
    // callNotification('Risk deleted Successfully', 'success');
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTableData([]);
    setAssessmentStatus({});
    console.log(assesmentStatus);
    setAuditHistory([]);
  };

  const onCancel = () => {
    setVisible(false);
    setAuditAssessmentRecord([]);
  };

  // useEffect(()=>{
  //   alert(assesmentStatus)
  // },[assesmentStatus])

  const handleView = (record) => {
    console.log([record.created_by, record.reviewed_by, record.approved_by]);
    let auditList = [];
    record.created_by !== null
      ? auditList.push(`created_by : ${record.created_by}`)
      : console.log('');
    record.reviewed_by !== null
      ? auditList.push(
          `reviewed_by : ${record.reviewed_by} ,reviewed_comment: ${record.reviewed_comment}`
        )
      : console.log('');
    record.approved_by !== null
      ? auditList.push(
          `approved_by : ${record.approved_by} ,approved_comment: ${record.approved_comment}`
        )
      : console.log('');
    record.rejected_by !== null
      ? auditList.push(
          `rejected_by : ${record.rejected_by} ,rejected_comment: ${record.rejected_comment}`
        )
      : console.log('');
    setAuditHistory(auditList);
    setAssessmentStatus({ record: record.status, id: record.id });
    const risk = risks.filter((risk) => risk.id === record.id);
    const listData = [];

    setIsModalVisible(true);
    // console.log(risk[0]['assessment_data'])
    const selectedRecord = risk[0]['assessment_data'];
    Object.entries(risk[0]['assessment_data']).forEach(([key, value]) => {
      questions.map((qkey) => {
        if (qkey.ref === key) {
          const selectedValue =
            value == 1
              ? 'Not comply'
              : value == 2
              ? 'Partly Comply'
              : value == 3
              ? 'Fully comply'
              : "Don't know";
          listData.push({
            Ref: qkey.ref,
            Category: qkey.category_name,
            question: qkey.question,
            Selected: selectedValue,
            es: selectedRecord[`ES${qkey.ref}`],
          });
          // console.log(`${qkey.question}:${value}`)
        }
      });
    });
    setTableData(listData);
  };

  useEffect(() => {
    dispatch(fetchRisksAsync());
    console.log(risks);
  }, []);

  const dataSource = risks;

  const onFinish = (values) => {
    console.log(values);
    if (editMode) {
      dispatch(updateRiskAsync(values));
      // callNotification('Risk Edited Successfully', 'success');
    } else {
      dispatch(createRiskAsync(values));

      // callNotification('Risk Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },

    {
      title: 'created_by',
      dataIndex: 'created_by',
      key: 'created_by',
    },

    // {
    //   title: 'updated_at',
    //   dataIndex: 'updated_at',
    //   key: 'updated_at',
    // },

    // {
    //   title: 'updated_by',
    //   dataIndex: 'updated_by',
    //   key: 'updated_by',
    // },

    // {
    //   title: 'approved_by',
    //   dataIndex: 'approved_by',
    //   key: 'approved_by',
    // },

    // {
    //   title: 'approved_at',
    //   dataIndex: 'approved_at',
    //   key: 'approved_at',
    // },

    // {
    //   title: 'reviewed_by',
    //   dataIndex: 'reviewed_by',
    //   key: 'reviewed_by',
    // },

    // {
    //   title: 'reviewed_at',
    //   dataIndex: 'reviewed_at',
    //   key: 'reviewed_at',
    // },

    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color =
          status === 'APPROVED'
            ? 'green'
            : status === 'REVIEWED'
            ? 'yellow'
            : status === 'CREATED'
            ? 'blue'
            : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {/* <Button onClick={() => handleEdit(record)}>Update</Button> */}
          <Button onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
          <Button onClick={() => handleView(record)}>
            <EyeOutlined />
          </Button>
          {['CREATED', 'REVIEWED'].includes(record.status) ? (
            <Button onClick={() => handleAction(record)}>
              {record.status === 'CREATED'
                ? 'Review'
                : record.status === 'REVIEWED'
                ? 'Approve'
                : null}
            </Button>
          ) : null}
          {record.status === 'APPROVED' ? (
            <Button onClick={() => handleViewAssessment(record)}>
              <EyeOutlined /> Summary
            </Button>
          ) : null}
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
      <Table dataSource={dataSource} columns={columns} />

      {/* Modal for adding/editing a record */}
      <Modal
        title="View Detail"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width="1000px"
      >
        {assesmentStatus.record == 'DRAFT' ? (
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: '10px' }}
            onClick={() => handleCompleteDraft()}
          >
            Complete Draft
          </Button>
        ) : (
          ''
        )}

        <div className="custom-scrollbar">
          <Card>
            <List
              size="small"
              bordered={true}
              dataSource={data}
              style={{
                marginBottom: '50px',
                width: '500px',
                backgroundColor: '#FAFAFA',
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Table
              dataSource={tableData}
              columns={viewColumns}
              pagination={false}
            />
          </Card>
        </div>
      </Modal>
      <AssessmentSummary
        visible={visible}
        onCancel={onCancel}
        auditAssessmentRecord={auditAssessmentRecord}
      />
      <CommentModal
        commentVisible={commentVisible}
        closeComment={closeComment}
        commentRecord={commentRecord}
      />
    </div>
  );
};

export default RiskTable;
