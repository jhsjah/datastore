const API_BASE_URL = process.env.API_BASE_URL;

fetch(API_BASE_URL)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));