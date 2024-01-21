// server.js
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL =  'https://nlkntqazltyzupsukbhp.supabase.co';
const SUPABASE_API_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sa250cWF6bHR5enVwc3VrYmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NjU2OTYsImV4cCI6MjAyMDA0MTY5Nn0.8tcMGXIzL4xLI2t2_au2juZK_45eGNojBhSWMxxeCgs';
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const app = express();
const PORT = 80;

// app.use(express.json());
app.use(bodyParser.json());

app.get('/api/getData', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/readings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Supabase');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/insertData', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('readings')
      .insert([req.body])
      .select(); // Assuming req.body contains the data to be inserted

    if (error) {
      throw new Error(error.message);
    }

    res.json({ message: 'Data inserted successfully', insertedData: "1"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/* // server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    // Example API call using Axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 */