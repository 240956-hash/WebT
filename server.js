const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const OPENWEATHER_KEY = "389b0bfbd489f75e77a5c03d53688ddf";
const NEWS_API_KEY = "b2785a631feb4192b4a5c06930d2a119";
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`
    );

    const data = response.data;

    const result = {
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      wind_speed: data.wind.speed,
      coordinates: data.coord,
      country: data.sys.country,
      rain_3h: data.rain ? data.rain["3h"] || 0 : 0
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});
app.get("/news/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}`
    );

    res.json(response.data.articles.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
