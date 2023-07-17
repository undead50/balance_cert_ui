import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
})

const AxiosInterceptor = ({ children }) => {

    // const navigate = useNavigate();

    useEffect(() => {

        const resInterceptor = response => {
            if (response.status === 200) {
                alert('success')
            }
            return response;
        }

        const errInterceptor = error => {

            if (error.response.status === 401) {
                // navigate('/login');
            }

            return Promise.reject(error);
        }


        const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

        return () => instance.interceptors.response.eject(interceptor);

    }, [])

    return children;
}


export default instance;
export { AxiosInterceptor }