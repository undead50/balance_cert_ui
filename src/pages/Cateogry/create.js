import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { createCategoryAsync, updateCategoryAsync } from '../../store/slices/categorySlice';
import { useNotification } from '../../hooks/index';

const CategoryForm = (props) => {
  const { callNotification } = useNotification();

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.editMode) {
      form.setFieldsValue(props.categoryRecord);
    }
    else {
      form.resetFields()
    }
  }, [props])

  const onFinish = (values) => {
    // Handle form submission logic here
    if (props.editMode) {
      console.log(values)
      dispatch(updateCategoryAsync(values))
      props.visible();
    }
    else {
      values.status = 'A'
      values.created_at = new Date()
      dispatch(createCategoryAsync(values));
      form.resetFields();
      props.visible();
      callNotification('Category Added Successfully', 'success');
    }

  };

  return (
    <Form form={form} onFinish={onFinish} style={{ marginTop: '6px' }}>
      {props.editMode && <Form.Item name="id" hidden={true}>
        <Input></Input>
      </Form.Item>}
      <Form.Item
        name="categoryName"
        label="Category Name"
        rules={[{ required: true, message: 'Please enter the category name' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>
      <Form.Item
        name="weightOfelement"
        label="weightOfelement"
        rules={[{ type: 'float', required: true, message: 'Please Provide Valid Weight of Category' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {props.editMode ? 'Edit' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
