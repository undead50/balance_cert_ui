import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks';
import {BACKEND_URL} from "./../../config";


const LoginPage = () => {
  const navigate = useNavigate();  
  const onSubmit = async (values) => {
    console.log('Received values of form: ', values);
    alert(BACKEND_URL+'/auth/adlogin')
    const response = await useFetch(BACKEND_URL+'/auth/adlogin',values)
    alert(response)
    console.log(response)
    navigate('/')
  };

  // const callAPi  = (data) => {
  //   useFetch(BACKEND_URL+'/auth/adlogin',data)
  // }



  return (
    <div style={{ maxWidth: 300, margin: '0 auto', marginTop: 200 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img src="https://www.ctznbank.com/assets/backend/uploads/logo-new.png" alt="Logo" style={{ height: 80 }} />
      </div>
      <u><h3>Audit Tracking System</h3></u>
      <Form name="login-form" onFinish={onSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
