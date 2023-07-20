import React, { useEffect } from 'react';
import { Table, Button, Modal, Tag } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateQuestion from './create';
import { deleteQuestionAsync, fetchQuestionsAsync } from '../../store/slices/questionSlice';
import { Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';





const handleView = (record) => {
  // Handle the action when the View button is clicked
  console.log('View button clicked for record:', record);
};

const QuestionIndex = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.question);
  const [visible, setVisible] = useState(false);
  const [questionRecord, setQuestionRecord] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState('')


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
      render: (status) => {
        let color = status === 'A' ? 'green' : 'red';
        return <Tag color={color}>{status == 'A' ? 'Active' : 'Deleted'}</Tag>;
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    // {
    //   title: 'Created At',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    // },
    // {
    //   title: 'Created By',
    //   dataIndex: 'created_by',
    //   key: 'created_by',
    // },
    // {
    //   title: 'Approved By',
    //   dataIndex: 'approved_by',
    //   key: 'approved_by',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {/* <Button type="primary" onClick={() => handleView(record)}>
            View
          </Button> */}
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}><DeleteOutlined style={{ color: 'red' }} /></Button>
        </Space>
      ),
    },
  ];
  const handleAdd = () => {
    // Handle the action when the Add button is clicked
    setVisible(true);
  };

  const handleDelete = (record) => {
    dispatch(deleteQuestionAsync(record.id));
  }

  const handleEdit = (record) => {
    // alert(record.category_name)
    // alert(record)
    setEditMode(true)
    setVisible(true)
    setQuestionRecord(record)
    setSelectedOption(parseInt(record.categoryId))
    // alert(record.categoryId)
  }


  const handleCancel = () => {
    setVisible(false);
    setEditMode(false)
  };

  useEffect(() => {
    dispatch(fetchQuestionsAsync());
  }, []);

  const dataSource = questions;

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: '16px' }}
      >
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editMode ? "Question Edit Form" : "Questions Add Form"}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <CreateQuestion visible={handleCancel} questionRecord={questionRecord} editMode={editMode} selectedOption={selectedOption} />
      </Modal>
    </div>
  );
};

export default QuestionIndex;
