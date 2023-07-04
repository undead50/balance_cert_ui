import React, { useEffect } from 'react';
import { Form, Input, Button  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import './index.css';
import Spinner from '../../components/Spinner';
import { setUser } from '../../store';
import {useSelector,useDispatch} from 'react-redux'
import { postLoginData } from '../../store/slices/authSlice';
import {useNotification} from '../../hooks/index'

const LoginPage = () => {
    // alert('login')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {callNotification} = useNotification();

    const { data, loading, error } = useSelector((state) => state.auth);
    // useNotification('Login Denied','error')

    useEffect(()=>{
      if(data){
        if (data.Code === "0"){
          dispatch(setUser({
            userName: data.Data.userName,
            solId:data.Data.solId,
            email:data.Data.email,
            departmentName:data.Data.departmentName,
            token:data.Data.token
        }))
        navigate('/');
        callNotification('Login Success','success')
      } else {
        callNotification('Login Denied','error')
      }
      }
    },[data])

    
    const onFinish = (values) => {
    // Call the postData function from the custom hook
    const reqData = {
      username:values.username,
      password:values.password
    }
    dispatch(postLoginData(reqData))
    alert(data)
    console.log(data)
    

  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', marginTop: 200 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img
          src= {process.env.PUBLIC_URL + '/images/citizens-logo.png'}
          alt="Logo"
          style={{ height: 80 }}
        />
      </div>
      <u>
        <h3>Risk Assessment tool </h3>
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
        {loading && <Spinner />}
        {/* <Outlet/> */}
      </Form>
    </div>
  );
};

export default LoginPage;
