import { Table, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {getCategoryData} from '../../store/slices/categorySlice';

const dataSource = [
  {
    id: 1,
    categoryName: 'Category 1',
    created_at: '2023-07-04',
    status: 'Active',
  },
  // Add more data as needed
];

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

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCategoryData())
    console.log(data)
  },[])

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CategoryIndex;