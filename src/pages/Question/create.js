import React, { useEffect,useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { getCategoryData } from '../../store/slices/categorySlice';
import { addQuestion } from '../../store/slices/questionSlice';
import { useNotification } from '../../hooks/index';

const { Option } = Select;

const CreateQuestion = (props) => {

    const { callNotification } = useNotification();
  
  const dispatch = useDispatch();  

  const { data, loading, error } = useSelector((state) => state.category);
  const [options, setOptions] = useState([]);  
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Form values:', values);
    dispatch(addQuestion(values));
    if(error){
    callNotification('Something went Worng', 'error');
    }
    else{
    form.resetFields();
    props.visible();
    callNotification('Question Added Successfully', 'success');

    }
    
    
  };


  useEffect(()=>{
    dispatch(getCategoryData())
    const optionData = data.map((key)=>{
        return {
            value: key.id,
            label: key.categoryName
        }
       
    })
    setOptions(optionData)
  },[])

  return (
    <Form  form={form} onFinish={onFinish}>
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
        {options.map(option => (
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
        rules={[{ required: true, message: 'Please enter the weight' }]}
      >
        <Input placeholder="Enter the weight" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateQuestion;