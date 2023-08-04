
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


app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await fetch('https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    // Check if the response status is okay
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



app.listen(3000, () => {
  console.log("server is on");
});

