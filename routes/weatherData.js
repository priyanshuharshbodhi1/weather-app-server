// weather.js
const express = require("express");
const { getWeatherData } = require("../controllers/weatherData");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    // Call OpenCage Geocoding API for reverse geocoding
    const reverseGeocodingResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ff7db3cbd93d4341ae414bf570fdd4f3`
    );
    const location = reverseGeocodingResponse.data.results[0].formatted;

    // Call getWeatherData function from the controller
    const weatherData = await getWeatherData(latitude, longitude);

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

module.exports = router;
