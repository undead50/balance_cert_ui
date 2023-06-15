import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import useApiPost from '../../hooks/index';
import { BACKEND_URL } from './../../config';
import './index.css';
import Spinner from '../../components/Spinner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store';
import { login } from '../../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, data, postData } = useApiPost();
  const onFinish = (values) => {
    // Call the postData function from the custom hook
    const endpoint = BACKEND_URL + '/auth/adlogin';
    const reqData = {
      username:values.username,
      password:values.password
    }
    postData(endpoint,reqData)
      .then((response) => {
        // Handle successful response
        console.log(response);
        // dispatch(setUser({
        //     userName: 'test',
        //     solId:'test',
        //     email:'test',
        //     departmentName:'test'
        // }))
        // dispatch(login())
        if(response.Code === "0"){
          dispatch(login())
          dispatch(setUser({
              userName: response.Data.userName,
              solId:response.Data.solId,
              email:response.Data.email,
              departmentName:response.Data.departmentName,
              token:response.Data.token
          }))
        }
        
        navigate('/');
      })
      .catch((error) => {
        // Handle error
        alert(error);
        console.error(error);
        navigate('/');
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', marginTop: 200 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src="https://www.ctznbank.com/assets/backend/uploads/logo-new.png"
          alt="Logo"
          style={{ height: 80 }}
        />
      </div>
      <u>
        <h3>Audit Tracking System</h3>
      </u>

      <Form name="login-form" onFinish={onFinish}>
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
        {isLoading && <Spinner />}
        <Outlet/>
      </Form>
    </div>
  );
};

export default LoginPage;
