import React, { useEffect } from 'react';
import { Form, Input, Button, Card,Typography } from 'antd';
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

  const { Title } = Typography;

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
            isBranchManager: (data.Data.functionalTitle === "Branch Manager" || data.Data.functionalTitle === "Assistant Branch Manager") ? "Y" : "N",
            employeeName: data.Data.employeeName,
            isSuperAdmin: data.Data.isSuperAdmin,
            image: data.Data.image,
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
      <Card className='custom-card' >
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + '/images/citizens-logo.png'}
            alt="Logo"
          />
        </div>
        
        <Title level={4} code style={{ textAlign: 'center',marginBottom:'15px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          Risk Assessment System
        </Title>
        
            
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
            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button type="primary" loading={loading}  shape="round" htmlType="submit" style={{ width:'30%',boxShadow: '6px 2px 9px rgba(0, 0, 0, 0.2)' }}>
              Log In
              </Button>
              </div>
          </Form.Item>
          {/* {loading && <Spinner />} */}
          {/* <Outlet/> */}
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
