import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createCategoryAsync } from '../../store/slices/categorySlice';
import { useNotification } from '../../hooks/index';

const CategoryForm = (props) => {
  const { callNotification } = useNotification();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // Handle form submission logic here
    values.status = 'A'
    values.created_at = new Date()
    dispatch(createCategoryAsync(values));
    form.resetFields();
    props.visible();
    callNotification('Category Added Successfully', 'success');
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ marginTop: '6px' }}>
      <Form.Item
        name="categoryName"
        label="Category Name"
        rules={[{ required: true, message: 'Please enter the category name' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
