import axios from 'axios';

//const baseURL = 'http://127.0.0.1:8000/';
const baseURL = 'https://react-backend-social.herokuapp.com/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;
