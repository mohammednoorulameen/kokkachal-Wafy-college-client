// utils/adminAxios.js
import axios from 'axios';

// Create an Axios instance
const adminInstance = axios.create({
  baseURL: 'http://localhost:4040/api/admin', 
  // baseURL: 'https://kokkachal-wafy-college-server.onrender.com/api/admin', 

  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token automatically
adminInstance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken'); 
    if (adminToken) {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminInstance;
