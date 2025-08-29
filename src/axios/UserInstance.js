// utils/adminAxios.js
import axios from 'axios';

// Create an Axios instance
const userInstance = axios.create({
  // baseURL: 'http://localhost:4040/api/user', // Use your backend admin base route
  baseURL: 'https://kokkachal-wafy-college-server.onrender.com/api/user', // Use your backend admin base route

  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default userInstance;
