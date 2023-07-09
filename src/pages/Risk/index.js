import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createRiskAsync,
  deleteRiskAsync,
  fetchRisksAsync,
  updateRiskAsync,
} from '../../store/slices/riskSlice';
import { useNotification } from '../../hooks/index';

const RiskTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { risks, loading, error } = useSelector(
    (state) => state.risk
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
    dispatch(deleteRiskAsync(record.id));
    callNotification('Risk deleted Successfully', 'success');
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
        title: 'assessment_data',
        dataIndex: 'assessment_data',
        key: 'assessment_data',
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

      

      {
        title: 'updated_at',
        dataIndex: 'updated_at',
        key: 'updated_at',
      },

      

      {
        title: 'updated_by',
        dataIndex: 'updated_by',
        key: 'updated_by',
      },

      

      {
        title: 'approved_by',
        dataIndex: 'approved_by',
        key: 'approved_by',
      },

      

      {
        title: 'approved_at',
        dataIndex: 'approved_at',
        key: 'approved_at',
      },

      

      {
        title: 'reviewed_by',
        dataIndex: 'reviewed_by',
        key: 'reviewed_by',
      },

      

      {
        title: 'reviewed_at',
        dataIndex: 'reviewed_at',
        key: 'reviewed_at',
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
          
          <Form.Item name="id" label="id">
            <Input/>
          </Form.Item>
          
          <Form.Item name="assessment_data" label="assessment_data">
            <Input/>
          </Form.Item>
          
          <Form.Item name="created_at" label="created_at">
            <Input/>
          </Form.Item>
          
          <Form.Item name="created_by" label="created_by">
            <Input/>
          </Form.Item>
          
          <Form.Item name="updated_at" label="updated_at">
            <Input/>
          </Form.Item>
          
          <Form.Item name="updated_by" label="updated_by">
            <Input/>
          </Form.Item>
          
          <Form.Item name="approved_by" label="approved_by">
            <Input/>
          </Form.Item>
          
          <Form.Item name="approved_at" label="approved_at">
            <Input/>
          </Form.Item>
          
          <Form.Item name="reviewed_by" label="reviewed_by">
            <Input/>
          </Form.Item>
          
          <Form.Item name="reviewed_at" label="reviewed_at">
            <Input/>
          </Form.Item>
          
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

export default RiskTable;