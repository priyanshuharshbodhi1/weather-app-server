// weather.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    console.log(longitude)

    // Call OpenCage Geocoding API for reverse geocoding
    const reverseGeocodingResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ff7db3cbd93d4341ae414bf570fdd4f3`
    );
    const location = reverseGeocodingResponse.data.results[0].formatted;

    // Call OpenWeatherMap API for weather data
    const weatherData = await getWeatherData(latitude, longitude);
    console.log(location);

    // Send the response
    res.json({
      weatherData: weatherData,
      location: location,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getWeatherData(latitude, longitude) {
  const apiKey = "20f7632ffc2c022654e4093c6947b4f4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${apiKey}`;
  const response = await axios.get(apiUrl);
  return response.data;
}

module.exports = router;
