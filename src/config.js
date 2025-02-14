import axios from 'axios';

export const API_BASE_URL = 'https://newsapibackend-746u.onrender.com/api';

// Example: Fetching data from /api/slider1
axios.get(`${API_BASE_URL}/slider1`)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });