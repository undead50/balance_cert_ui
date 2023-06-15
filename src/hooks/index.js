import { useState } from 'react';
import axios from 'axios';
import { timeout } from '../config';

const useApiPost = () => {
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

export default useApiPost;
