import { Table, Button, Space, Modal, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  fetchCategorysAsync,
  deleteCategoryAsync,
} from '../../store/slices/categorySlice';
import CategoryForm from './create';
import Spinner from '../../components/Spinner';

// const dataSource = [
//   {
//     id: 1,
//     categoryName: 'Category 1',
//     created_at: '2023-07-04',
//     status: 'Active',
//   },
//   // Add more data as needed
// ];

const CategoryIndex = () => {


  const [editMode, setEditMode] = useState(false)
  const [categoryRecord, setCategoryRecord] = useState({})

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <Button onClick={() => handeEdit(record)}>Update</Button>
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            onClick={() => handleDelete(record.id)}
          >

          </Button>
        </Space>
      ),
    },
  ];

  const handeEdit = (record) => {
    setVisible(true)
    setEditMode(true)
    setCategoryRecord(record)
  }

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Deleting record with ID: ${id}`);
    dispatch(deleteCategoryAsync(id));
  };
  const { categorys, loading, error } = useSelector((state) => state.category);

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditMode(false);
  };

  const handleAddButtonClick = () => {
    setEditMode(false)
    setVisible(true);
  };

  const dataSource = categorys;

  // dispatch(getCategoryData());

  useEffect(() => {
    dispatch(fetchCategorysAsync());
    // console.log(categorys);
    // alert('hi')
  }, [dispatch]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          handleAddButtonClick();
        }}
        style={{ marginBottom: 16 }}
      >
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editMode ? "Category Edit Mode" : "Category Add Form"}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <CategoryForm visible={handleCancel} categoryRecord={categoryRecord} editMode={editMode} />
      </Modal>
    </div>
  );
};

export default CategoryIndex;
