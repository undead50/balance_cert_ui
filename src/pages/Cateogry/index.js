import { Table, Button, Space, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategoryData } from '../../store/slices/categorySlice';
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
};

const CategoryIndex = () => {
  const { data, loading, error } = useSelector((state) => state.category);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddButtonClick = () => {
    setVisible(true);
  };

  const dataSource = data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryData());
    console.log(data);
  }, []);

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
      {loading && <Spinner />}
    </div>
  );
};

export default CategoryIndex;
