import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Space,Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createRiskAsync,
  deleteRiskAsync,
  fetchRisksAsync,
  updateRiskAsync,
} from '../../store/slices/riskSlice';
import { useNotification } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './index.css'

const RiskTable = () => {

  

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [tableData,setTableData] = useState([]);
  const [assesmentStatus,setAssessmentStatus] = useState({});

  const navigate = useNavigate();
  const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { risks, loading, error } = useSelector((state) => state.risk);

  const { questions } = useSelector((state) => state.question);


  const viewColumns = [
    { title: 'Ref', dataIndex: 'Ref', key: 'Ref' },
    { title: 'Category', dataIndex: 'Category', key: 'Ref' },
    { title: 'Observation as per manual/circulars/NRB Directives', dataIndex: 'question', key: 'question' },
    { title: 'Selected', dataIndex: 'Selected', key: 'Selected' },
    { title: 'Explanation of score', dataIndex: 'es', key: 'es' },  
  ];

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

  const handleCompleteDraft = ()=>{
    alert(assesmentStatus.id)
    navigate(`/riskassessment/${assesmentStatus.id}`)
  }

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteRiskAsync(record.id));
    callNotification('Risk deleted Successfully', 'success');
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTableData([])
    setAssessmentStatus({})
    console.log(assesmentStatus)
  };

  // useEffect(()=>{
  //   alert(assesmentStatus)
  // },[assesmentStatus])


  const handleView = (record)=>{
    setAssessmentStatus({record: record.status,id :record.id})
    const risk = risks.filter(risk => risk.id === record.id);
    const listData = []

    setIsModalVisible(true)
    // console.log(risk[0]['assessment_data'])
    const selectedRecord = risk[0]['assessment_data']
    Object.entries(risk[0]['assessment_data']).forEach(([key, value]) => {
      questions.map((qkey)=>{
        
        if(qkey.ref === key){
          const selectedValue = value == 1 ? 'Not comply':value == 2 ? 'Partly Comply':value == 3?'Fully comply':"Don't know";
          listData.push({ Ref: qkey.ref,Category:qkey.category_name, question: qkey.question ,Selected:selectedValue,es:selectedRecord[`ES${qkey.ref}`]})
          // console.log(`${qkey.question}:${value}`)
        }
      })
    });
    setTableData(listData)
  }

  useEffect(() => {
    dispatch(fetchRisksAsync());
    console.log(risks);
  }, []);

  const dataSource = risks;

  const onFinish = (values) => {
    console.log(values);
    if (editMode) {
      dispatch(updateRiskAsync(values));
      callNotification('Risk Edited Successfully', 'success');
    } else {
      dispatch(createRiskAsync(values));
      callNotification('Risk Created Successfully', 'success');
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
        let color = status === 'CREATED' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {/* <Button onClick={() => handleEdit(record)}>Update</Button> */}
          <Button onClick={() => handleDelete(record)}>Delete</Button>
          <Button onClick={()=>handleView(record)}>View</Button>
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
        <div
          bordered={true}
          style={{ overflow: "auto", height: "70vh", padding: "10px 0 0 0" }}
        >
        { assesmentStatus.record == 'DRAFT' ? <Button onClick={()=>handleCompleteDraft()}>Compete Draft</Button>:''}  
        <Card>  
        <Table dataSource={tableData} columns={viewColumns} pagination={false} />
        </Card>
       
        </div>
      </Modal>
    </div>
  );
};

export default RiskTable;
