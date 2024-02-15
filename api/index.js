const express = require('express');
const { scrapeEventInfo, scrapeEventImages } = require('./scraper');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/urls', async (req, res) => {
  try {
    const result = await scrapeEventInfo();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/event-images', async (req, res) => {
  try {
    const result = await scrapeEventImages();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/', (req, res) => {
  res.send(`
  Welcome to the FC scraper API! <br> <br>

  for event URLs: /api/urls <br>
  for event images: /api/event-images <br> <br>
  Made by: AdvanceFalling Team
      `)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
