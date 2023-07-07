import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPrivilegesAsync } from '../../store/slices/privilegeSlice';

const UserPrivilegesTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const dispatch = useDispatch()  

  const { privileges, loading, error } = useSelector((state) => state.privilege);



  // Function to handle opening the modal for adding/editing a record
  const handleModalOpen = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Function to handle saving the record
  const handleSave = (record) => {
    // Save the record to the backend or update the existing record in the dataSource
    setIsModalVisible(false);
    console.log(record);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    // Delete the record from the backend or remove it from the dataSource
  };

  useEffect(()=>{
    dispatch(fetchPrivilegesAsync()
    )
    console.log(privileges)
    setDataSource(privileges)

  },[])

  const onFinish = (values)=>{
    console.log(values)
  }

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
          <Button onClick={() => handleModalOpen(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => handleModalOpen(null)}
        style={{ marginBottom: '16px' }}
      >
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      {/* Modal for adding/editing a record */}
      <Modal
        title={selectedRecord ? 'Edit Record' : 'Add Record'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => handleSave(selectedRecord)}
      >
        <Form onFinish={onFinish}>
          {/* Add form fields here based on your column fields */}
          <Form.Item name="MemberName" label="Member Name">
            <Input/>
          </Form.Item>
          <Form.Item label="Domain Username">
            <Input />
          </Form.Item>
          <Form.Item label="Privilege">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Created By">
            <Input />
          </Form.Item>
          <Form.Item label="Created Date">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPrivilegesTable;
