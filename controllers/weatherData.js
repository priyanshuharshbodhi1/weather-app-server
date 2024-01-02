const axios = require("axios");

async function getWeatherData(latitude, longitude) {
  const apiKey = "20f7632ffc2c022654e4093c6947b4f4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${apiKey}`;
  const response = await axios.get(apiUrl);
  return response.data;
}

module.exports = {
  getWeatherData,
};
