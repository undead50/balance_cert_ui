import React, { useEffect } from 'react';
import { Table, Button,Modal } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateQuestion from './create';
import { fetchQuestions } from '../../store/slices/questionSlice';


// const dataSource = [
//   {
//     id: 1,
//     questions: 'Sample question 1',
//     status: 'Approved',
//     category_name: 'Sample category',
//     created_at: '2023-07-01',
//     created_by: 'John Doe',
//     approved_by: 'Jane Smith',
//   },
//   // Add more data objects as needed
// ];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Questions',
    dataIndex: 'question',
    key: 'question',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Category Name',
    dataIndex: 'category_name',
    key: 'category_name',
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
  {
    title: 'Approved By',
    dataIndex: 'approved_by',
    key: 'approved_by',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" onClick={() => handleView(record)}>
        View
      </Button>
    ),
  },
];

const handleView = (record) => {
  // Handle the action when the View button is clicked
  console.log('View button clicked for record:', record);
};



const QuestionIndex = () => {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector((state) => state.question);
    const [visible, setVisible] = useState(false);
    const handleAdd = () => {
        // Handle the action when the Add button is clicked
        setVisible(true);
        };
     

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(()=>{
    dispatch(fetchQuestions())
  },[])

  const dataSource = data


  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Questions Add Form"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateQuestion visible={handleCancel} />
      </Modal>
    </div>
  );
};

export default QuestionIndex;
