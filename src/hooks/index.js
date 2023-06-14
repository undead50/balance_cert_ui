import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
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

// const useFetchpost = (url,reqData)=> {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect((url,reqData) => {
//     const fetchDatapost = async () => {
//       try {
//         const { data } = await axios.post(url,reqData);
//         console.log(data);
//         setData(data);
//         setLoading(false);
//         setError(false)
//       } catch (err) {
//         console.log(err)
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchDatapost();
//   }, [url]);
    
//   return {data, loading, error}
// }

export { useFetch };
