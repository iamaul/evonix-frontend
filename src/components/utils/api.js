import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const api = axios.create({
    baseURL: 'https://evonix-backend-api-old.vercel.app/',
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response.data.msg === 'Token is invalid!') {
            store.dispatch({ type: LOGOUT });
        }
        return Promise.reject(err);
    }
);
  
export default api;
