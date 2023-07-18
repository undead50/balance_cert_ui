import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createMarkAsync,
  deleteMarkAsync,
  fetchMarksAsync,
  updateMarkAsync,
} from '../../store/slices/markSlice';
import { useNotification } from '../../hooks/index';

const MarkTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { callNotification } = useNotification();
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { marks, loading, error } = useSelector(
    (state) => state.mark
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
    dispatch(deleteMarkAsync(record.id));
    callNotification('Mark deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchMarksAsync());
    console.log(marks);
  }, []);

  const dataSource = marks;

  const onFinish = (values) => {
    console.log(values);
    values.CreatedBy = userInfo.userName;
    if (editMode) {
      dispatch(updateMarkAsync(values));
      callNotification('Mark Edited Successfully', 'success');
    } else {
      dispatch(createMarkAsync(values));
      callNotification('Mark Created Successfully', 'success');
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
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
      },

      

      {
        title: 'WeightOfelement',
        dataIndex: 'WeightOfelement',
        key: 'WeightOfelement',
      },

      

      {
        title: 'CreatedBy',
        dataIndex: 'CreatedBy',
        key: 'CreatedBy',
      },

      

      {
        title: 'CreatedDate',
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
      },

      

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => handleAdd()}
        style={{ marginBottom: '16px' }}
      >
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      {/* Modal for adding/editing a record */}
      <Modal
        title={editMode ? 'Edit Record' : 'Add Record'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          {/* Add form fields here based on your column fields */}
          
          <Form.Item name="id">
            <Input type='hidden'/>
          </Form.Item>
          
          <Form.Item name="Description" label="Description">
            <Input/>
          </Form.Item>
          
          <Form.Item name="WeightOfelement" label="WeightOfelement">
            <Input/>
          </Form.Item>
          
          {/* <Form.Item name="CreatedBy" label="CreatedBy">
            <Input/>
          </Form.Item>
          
          <Form.Item name="CreatedDate" label="CreatedDate">
            <Input/>
          </Form.Item> */}
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MarkTable;