import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/places', async (req, res) => {
  try {

    const response = await fetch("https://netzwelt-devtest.azurewebsites.net/Territories/All");


    if (!response.ok) {
      console.log(response.status)
      return res.status(response.status).json({ message: 'Error: Invalid credentials' });
    }


    const data = await response.json();
    res.json(data);

  } catch (error) {

    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Internal server error' });

  }
});

