// axiosInstance.js

import axios from 'axios';
import { NavLink, Navigate } from 'react-router-dom';


let store
export const injectStore = _store => {
  store = _store
}

const axiosInstance = axios.create({
  // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Modify the request config before sending the request
    // For example, you can add headers or authentication tokens
    console.log('Request Interceptor:', config);
    // window.history.pushState(null, null,'/app')
    
    // alert(store.getState().user.userInfo.token)
    // return config;
    
    
    return config
  },
  error => {
    // Handle request error
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Modify the response data before passing it to the .then() callback
    console.log('Response Interceptor:', response);
    if (response && response.status === 200) {
      // Handle the 404 error by redirecting to the specified URL
      // window.history.pushState(null, null,'/login')
      alert('h')
      return (<><Navigate to="/dashboard" replace={true} /></>)
    } else{

      
      return response;
    }
  },
  error => {
    // Handle response error
    console.error('Response Interceptor Error:', error);

    if (error.response && error.response.status === 404) {
      // Show an alert for a 404 error
      alert('404 Error: Resource not found');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;