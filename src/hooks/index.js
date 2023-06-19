import { useState } from 'react';
import axios from 'axios';
import { timeout } from '../config';
import {notification} from 'antd'
import { useEffect } from 'react';
import {useSelector} from "react-redux";

export const useNotification = () => {
  const callNotification = (description,type) =>{
      notification.open({
        message: 'info',
        description: description,
        duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
        type: type
        
      });
    }
  return { callNotification}  
}

export const useApiPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url, reqData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, reqData);
      setData(response.data);
      // alert(response.data.Code)
      return response.data;
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, postData };
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const  {userInfo}  = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url,{headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        }});
        alert('callapi'+url)
        console.log(data);
        setData(data);
        setLoading(false);
        setError(false)
      } catch (err) {
          console.log(err)
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
    
  return {data, loading, error}
};

