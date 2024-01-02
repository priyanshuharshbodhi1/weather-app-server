const express = require("express");
const cors = require("cors");
const axios = require("axios");
const weatherRoute = require("./routes/weatherData");
const socketIo = require("socket.io");
const app = express();

const port = 4000;
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use the weather route
app.use("/api/weather", weatherRoute);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
