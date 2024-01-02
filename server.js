const express = require("express");
const cors = require("cors");
const axios = require("axios");
const weatherRoute = require("./routes/weatherData");
const socketIo = require("socket.io");
const app = express();

const port = 4000;
app.use(cors());

// health check
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Middleware to parse JSON requests
app.use(express.json());

// // API endpoint for weather
// app.post("/api/weather", async (req, res) => {
//   try {
//     const { longitude, latitude } = req.body;

//     // Call OpenCage Geocoding API for reverse geocoding
//     const reverseGeocodingResponse = await axios.get(
//       `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ff7db3cbd93d4341ae414bf570fdd4f3`
//     );
//     const location = reverseGeocodingResponse.data.results[0].formatted;

//     // Call OpenWeatherMap API for weather data
//     const weatherData = await getWeatherData(latitude, longitude);
//     console.log(location);

//     // Send the response
//     res.json({
//       weatherData: weatherData,
//       location: location,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Function to get weather data from OpenWeatherMap API
// async function getWeatherData(latitude, longitude) {
//   const apiKey = "20f7632ffc2c022654e4093c6947b4f4";
//   // const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
//   const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${apiKey}`;
//   const response = await axios.get(apiUrl);
//   return response.data;
// }

// Use the weather route
app.use("/api/weather", weatherRoute);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});