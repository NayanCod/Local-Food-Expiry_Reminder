import axios from 'axios';

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', // Set your base URL
  headers: {
    'Content-Type': 'application/json', // Default Content-Type for all requests
  },
});

// Add a request interceptor to automatically add the Authorization header
axiosClient.interceptors.request.use(
  (config) => {
    // You can retrieve the token from localStorage or any other place
    const token = localStorage.getItem('token');
    
    if (token) {
      // Add the Authorization header if the token exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
