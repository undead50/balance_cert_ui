import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Tag, Space, Card, List, DatePicker, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, EyeOutlined, CheckOutlined, SearchOutlined, FilePdfOutlined,PlayCircleOutlined } from '@ant-design/icons';


import {
  calculateRiskAsync,
  createRiskAsync,
  deleteRiskAsync,
  fetchRisksAsync,
  updateRiskAsync,
} from '../../store/slices/riskSlice';
import { fetchBranchsAsync } from '../../store/slices/branchSlice';
import { fetchCategorysAsync } from '../../store/slices/categorySlice';
import { fetchQuestionsAsync } from '../../store/slices/questionSlice';
import { useNotification } from '../../hooks/index';
import { json, useNavigate } from 'react-router-dom';
import './index.css';
import AssessmentSummary from './AssessmentSummary';
import CommentModal from './CommentModal ';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { RangePicker } = DatePicker;

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
  const [modalRecord, setModalRecord] = useState({})

  const navigate = useNavigate();
  // const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const { risks, loading, error } = useSelector((state) => state.risk);
  const { branchs } = useSelector((state) => state.branch)

  const { questions } = useSelector((state) => state.question);
  const [auditHistoty, setAuditHistory] = useState([]);


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

    // alert(`${startDate},${endDate}`)
    // const data = {
    //   startDate,
    //   endDate
    // }
    let data
    userInfo.isSuperAdmin ? data = { startDate, endDate } : data = { startDate, endDate, branch_code: userInfo.solId }
    dispatch(fetchRisksAsync(data))
  }

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

  const downloadPDF = () => {
    const pdfDefinition = {
      content: [
        {
          text: "Branch Wise Risk Assessment Status",  // Add the heading here
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
    pdfDocGenerator.download('Branch_Wise_Risk_Assessment_Status.pdf');
  };

  // Function to handle opening the modal for adding/editing a record
  const handleAction = (record) => {
    setCommentVisible(true);
    setCommentRecord(record);
  };

  const closeComment = () => {
    setCommentVisible(false);
    closeModal()
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
    setModalRecord({})
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
    if (typeof selectedRecord === 'string') {
      var selectedObject = JSON.parse(selectedRecord);
    }
    else {
      var selectedObject = selectedRecord
    }


    Object.entries(selectedObject).forEach(([key, value]) => {
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
            es: selectedObject[`ES${qkey.ref}`],
          });
          // console.log(`${qkey.question}:${value}`)
        }
      });
    });
    console.log(tableData)
    setTableData(listData);
    setModalRecord(record)
  };

  // const getBranchDesc = (branchCode) => {
  //   let descripTion
  //   const branchDesc = branchs.map((branch) => {
  //     if (branchCode == branch.branchCode) {
  //       return branch.branchDesc
  //     }
  //   }
  //   )
  //   return branchDesc
  // }

  useEffect(() => {
    let data
    userInfo.isSuperAdmin ? data = {} : data = { branch_code: userInfo.solId }
    // userInfo.isSuperAdmin === true ? dispatch(fetchRisksAsync()) : dispatch((fetchRisksAsync({branch_code: userInfo.solId})));
    dispatch(fetchRisksAsync(data))
    // console.log(risks);
    dispatch(fetchBranchsAsync())
    dispatch(fetchCategorysAsync())
    dispatch(fetchQuestionsAsync())

    // const updatedBranch = risks.map((risk) => {
    //   return {
    //     risk,
    //     branchDesc: getBranchDesc(risk.branch_code)
    //   }
    // })

    // console.log(updatedBranch)
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
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },

    {
      title: 'Brach Code',
      dataIndex: 'branch_code',
      key: 'branch_code'
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
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },


    {
      title: 'Created By',
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

    {
      title: 'initiated_by',
      dataIndex: 'initiated_by',
      key: 'initiated_by',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters:
        [{
          text: 'APPROVED',
          value: 'APPROVED'
        },
        {
          text: 'CREATED',
          value: 'CREATED'
        },
        {
          text: 'REVIEWED',
          value: 'REVIEWED'
        },
        {
          text: 'REJECTED',
          value: 'REJECTED'
        },
        {
          text: 'DRAFT',
          value: 'DRAFT'
        }
        ],
      filterSearch: true,
      onFilter: (value, record) => record.status === value,
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
          <Tooltip placement="topLeft" title={record.status == 'INITIATED'?'Click to Start Assessment':'Click to View Assessment'}>
            <Button onClick={() => handleView(record)}>

              {record.status == "INITIATED" ? <PlayCircleOutlined />:<EyeOutlined /> }

            </Button>
          </Tooltip>
          {/* {userInfo.isBranchManager === 'Y' || userInfo.isSuperAdmin === true &&
            (['CREATED', 'REVIEWED'].includes(record.status) ? (
              <Button onClick={() => handleAction(record)}>
                {record.status === 'CREATED'
                  ? 'Review'
                  : record.status === 'REVIEWED'
                    ? 'Approve'
                    : null}
              </Button>
            ) : null)} */}

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
      {userInfo.isSuperAdmin ? <h2 style={{ justifyContent: 'center', display: 'flex', textDecoration: 'underline' }}>(Branch Wise Risk Assessment Status)</h2> : null}
      <Button onClick={downloadPDF} type="primary" shape='round'>
        Export Pdf<FilePdfOutlined />
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
          <Button type="primary" shape="circle" htmlType="submit"><SearchOutlined /></Button>
        </Form.Item>
      </Form>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns} loading={loading} />

      {/* Modal for adding/editing a record */}
      <Modal
        title="View Detail"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width="1000px"
      >
        {assesmentStatus.record == 'DRAFT' || assesmentStatus.record == "INITIATED" ? (
          <Button
            type="primary"
            size="small"
            shape='round'
            style={{ marginBottom: '10px' }}
            onClick={() => handleCompleteDraft()}
          >
            { assesmentStatus.record == 'DRAFT' ? 'Continue Draft': 'Start Assessment'}
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
            {userInfo.isBranchManager === 'Y' || userInfo.isSuperAdmin === true &&
              (['CREATED', 'REVIEWED'].includes(modalRecord.status) ? (
                <>
                  <Button type="primary" shape='round' onClick={() => handleAction(modalRecord)}>
                    <CheckOutlined />
                    {modalRecord.status === 'CREATED'
                      ? 'Review'
                      : modalRecord.status === 'REVIEWED'
                        ? 'Approve'
                        : null}

                  </Button>
                  <br />
                  <br />
                </>
              ) : null)}

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
