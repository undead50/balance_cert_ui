import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPrivilegeAsync,
  deletePrivilegeAsync,
  fetchPrivilegesAsync,
  updatePrivilegeAsync,
} from '../../store/slices/privilegeSlice';
import { useNotification } from '../../hooks/index';
import { DeleteOutlined } from '@ant-design/icons';

const UserPrivilegesTable = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { privileges, loading, error } = useSelector(
    (state) => state.privilege
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
    dispatch(deletePrivilegeAsync(record.id));
    callNotification('Previlage deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchPrivilegesAsync());
    console.log(privileges);
  }, []);

  const dataSource = privileges;

  const onFinish = (values) => {
    console.log(values);
    if (editMode) {
      dispatch(updatePrivilegeAsync(values));
      callNotification('Previlage Edited Successfully', 'success');
    } else {
      dispatch(createPrivilegeAsync(values));
      callNotification('Previlage Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Member Name',
      dataIndex: 'MemberName',
      key: 'MemberName',
    },
    {
      title: 'Domain Username',
      dataIndex: 'DomainUsername',
      key: 'DomainUsername',
    },
    {
      title: 'Privilege',
      dataIndex: 'Privilege',
      key: 'Privilege',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Created By',
      dataIndex: 'CreatedBy',
      key: 'CreatedBy',
    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}><DeleteOutlined style={{ color: 'red' }} /></Button>
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
          {editMode && (<Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>)}

          <Form.Item name="MemberName" label="Member Name">
            <Input />
          </Form.Item>
          <Form.Item name="DomainUsername" label="Domain Username">
            <Input />
          </Form.Item>
          <Form.Item name="Privilege" label="Privilege">
            <Select mode="single">
              <Option value="Creator">Creator</Option>
              <Option value="Reviewer">Reviewer</Option>
              <Option value="Approver">Approver</Option>
              <Option value="Superadmin">Superadmin</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item name="Email" label="Email">
            <Input />
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

export default UserPrivilegesTable;
