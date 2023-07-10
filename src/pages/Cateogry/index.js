import { Table, Button, Space, Modal,Tag } from 'antd';
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
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
  };

  const handleAddButtonClick = () => {
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
        title="Category Add Form"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <CategoryForm visible={handleCancel} />
      </Modal>
    </div>
  );
};

export default CategoryIndex;
