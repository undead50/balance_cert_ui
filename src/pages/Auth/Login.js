import React, { useEffect } from 'react';
import { Form, Input, Button, Card,Tooltip } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Spinner from '../../components/Spinner';
import { setUser } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { postLoginData } from '../../store/slices/authSlice';
import { useNotification } from '../../hooks/index';
import { resetStateUser } from '../../store/slices/userSlice';
import { resetStateRisk } from '../../store/slices/riskSlice';
import { resetStateQuestion } from '../../store/slices/questionSlice';
import { resetStatePrivilege } from '../../store/slices/privilegeSlice';
import { resetStateCategory } from '../../store/slices/categorySlice';
import { resetStateMark } from '../../store/slices/markSlice';
import { resetStateDashboard } from '../../store/slices/dashboardSlice';

const LoginPage = () => {
  // alert('login')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { callNotification } = useNotification();

  const { data, loading, error } = useSelector((state) => state.auth);
  // useNotification('Login Denied','error')

  useEffect(() => {
    dispatch(resetStateUser());
    dispatch(resetStateRisk());
    dispatch(resetStateQuestion());
    dispatch(resetStatePrivilege());
    dispatch(resetStateCategory());
    dispatch(resetStateMark());
    dispatch(resetStateDashboard());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.Code === '0') {
        dispatch(
          setUser({
            userName: data.Data.domainUserName,
            solId: data.Data.solId,
            email: data.Data.email,
            departmentName: data.Data.departmentName,
            token: data.Data.token,
            isBranchManager: data.Data.isBranchManager,
            employeeName: data.Data.employeeName,
            isSuperAdmin: data.Data.isSuperAdmin,
          })
        );
        navigate('/');
        callNotification('Login Success', 'success');
      } else {
        callNotification('Login Denied', 'error');
      }
    }
  }, [data]);

  const onFinish = (values) => {
    // Call the postData function from the custom hook
    const reqData = {
      username: values.username,
      password: values.password,
    };
    dispatch(postLoginData(reqData));
    // alert(data)
    console.log(data);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #468CC1, #3EAB94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ maxWidth: '25%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src={process.env.PUBLIC_URL + '/images/citizens-logo.png'}
            alt="Logo"
            style={{
              height: 80,
              width: '90%',
              marginLeft: '20px',
              maxHeight: '10vh',
            }}
          />
        </div>
        
        <h3><strong>Risk Assessment System </strong></h3>
        
            
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
            {/* <Tooltip placement="topLeft" title="Click to Start Assessment':'Click to View Assessment"></Tooltip> */}
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
      </Card>
    </div>
  );
};

export default LoginPage;
