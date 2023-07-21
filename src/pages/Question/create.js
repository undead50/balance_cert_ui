import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorysAsync } from '../../store/slices/categorySlice';
import { createQuestionAsync, updateQuestionAsync } from '../../store/slices/questionSlice';
import { useNotification } from '../../hooks/index';

const { Option } = Select;

const CreateQuestion = (props) => {

  const { callNotification } = useNotification();

  const dispatch = useDispatch();

  const { categorys, loading, error } = useSelector((state) => state.category);
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();


  useEffect(() => {
    // alert(props.initialValue)
    // form.resetFields()
    if (props.editMode) {
      const newValues = {
        question: props.questionRecord.question,
        ref: props.questionRecord.ref,
        weight: props.questionRecord.weightOfelement,
        // category: props.questionRecord.categoryId,
        id: props.questionRecord.id,
      };
      form.setFieldsValue(newValues);

      // console.log(props.questionRecord);
    }
    else {
      form.resetFields()
    }

  }, [props])

  const initialValues = {
    category: props.selectedOption, // Set the initial value for the select field
    // ... other initial values for other form fields if needed
  };

  console.log(initialValues)

  const onFinish = (values) => {
    console.log('Form values:', values);
    if (props.editMode) {
      console.log(values)
      dispatch(updateQuestionAsync(values))
      props.visible();
    } else {
      dispatch(createQuestionAsync(values));

      if (error) {
        callNotification('Something went Worng', 'error');
      } else {
        form.resetFields();
        props.visible();
        callNotification('Question Added Successfully', 'success');
      }
    }

  };

  useEffect(() => {
    dispatch(fetchCategorysAsync());
    const optioncategorys = categorys.map((key) => {
      return {
        value: key.id,
        label: key.categoryName,
      };
    });
    setOptions(optioncategorys);
  }, []);

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      {props.editMode && (<Form.Item name="id" hidden={true}>
        <Input />
      </Form.Item>)}

      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: 'Please enter a question' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter your question" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select a category">
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Ref"
        name="ref"
        rules={[{ required: true, message: 'Please enter a reference' }]}
      >
        <Input placeholder="Enter a reference" />
      </Form.Item>

      <Form.Item
        label="Weight of Element"
        name="weight"
        rules={[{ type: 'float,integer', required: true, message: 'Please enter the weight' }]}
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

export default CreateQuestion;
