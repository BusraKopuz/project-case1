import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/api/flights', async (req, res) => {
  try {
    const response = await axios.get('https://api.schiphol.nl/public-flights/flights', {
      headers: {
        'Accept': 'application/json',
        app_id: '0bb7716e',
        app_key: '786d027da17d7a8eeb9b71883e6a2fa8',
        'ResourceVersion': 'v4'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error.message);
    res.status(500).json({ error: 'Error fetching flights' });
  }
});

// 3000 numaralı portta dinleme yapıyoruz
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});