// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardForm from './components/CardForm';
import CardForm2 from './components/CardForm2';
import CardForm3 from './components/CardForm3';
import './App.css';

const App = () => {
  const [, setCards] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch cards on component mount
  useEffect(() => {
    axios
      .get('https://newsapibackend-746u.onrender.com/api')
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  return (

  
      
    <>  
<div className="App">
      
      <h1>Government Sector</h1>
      {message && <p>{message}</p>}

      <CardForm setCards={setCards} setMessage={setMessage} />
  


      
<h1>Private Sector</h1>
{message && <p>{message}</p>}

<CardForm2 setCards={setCards} setMessage={setMessage} />



      
<h1>Other Sector</h1>
{message && <p>{message}</p>}

<CardForm3 setCards={setCards} setMessage={setMessage} />


</div>
    </>
  );
};

export default App;
