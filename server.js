/* eslint-env node */
/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
"use strict";
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

// CODELAB: Change this to add a delay (ms) before the server responds.
const FORECAST_DELAY = 0;

// CODELAB: If running locally, set your Dark Sky API key here
const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}&units=metric&lang=kr`;

// Fake forecast data used if we can't reach the Dark Sky API
const fakeForecast = {
  fakeData: true,
  lat: 37.7793,
  lon: -122.4193,
  timezone: "America/Chicago",
  current: {
    dt: 1586001851,
    sunrise: 1586003020,
    sunset: 1586048382,
    temp: 30.15,
    feels_like: 277.75,
    pressure: 1017,
    humidity: 93,
    uvi: 9.63,
    clouds: 90,
    visibility: 6437,
    wind_speed: 2.1,
    wind_deg: 70,
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10n",
      },
      {
        id: 701,
        main: "Mist",
        description: "mist",
        icon: "50n",
      },
    ],
    rain: {
      "1h": 1.02,
    },
  },
  daily: [
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
    {
      dt: 1570258800,
      sunrise: 1570284513,
      sunset: 1570326446,
      temp: {
        max: 52.91,
        min: 41.35,
      },
      weather: {
        description: "partly-cloudy-night",
        icon: "02n",
      },
      humidity: 69,
      speed: 1.822,
      deg: 329,
    },
  ],
};

/**
 * Generates a fake forecast in case the weather API is not available.
 *
 * @param {String} location GPS location to use.
 * @return {Object} forecast object.
 */
function generateFakeForecast() {
  // Create a new copy of the forecast
  const result = Object.assign({}, fakeForecast);
  return result;
}

/**
 * Gets the weather forecast from the Dark Sky API for the given location.
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getForecast(req, resp) {
  const location = req.params.location || "&lat=40.7720232&lon=-73.9732319";
  const url = `${BASE_URL}${location}`;
  fetch(url)
    .then((resp) => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then((data) => {
      setTimeout(() => {
        resp.json(data);
      }, FORECAST_DELAY);
    })
    .catch((err) => {
      console.error("Open Weather Map API Error:", err.message);
      resp.json(generateFakeForecast());
    });
}

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for the data
  app.get("/forecast/:location", getForecast);
  app.get("/forecast/", getForecast);
  app.get("/forecast", getForecast);

  // Handle requests for static files
  app.use(express.static("public"));

  // Start the server
  return app.listen("8000", () => {
    // eslint-disable-next-line no-console
    console.log("Local DevServer Started on port 8000...");
  });
}

startServer();
