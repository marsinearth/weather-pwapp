import fetch from "node-fetch";
// CODELAB: If running locally, set your Dark Sky API key here
const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}&units=metric&lang=kr`;

// CODELAB: Change this to add a delay (ms) before the server responds.
const FORECAST_DELAY = 0;

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
export function handler(event, context) {
  const location =
    event.queryStringParameters || "&lat=40.7720232&lon=-73.9732319";
  const url = `${BASE_URL}${location}`;
  fetch(url, { headers: { Accept: "application/json" } })
    .then((resp) => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then((data) => {
      setTimeout(() => {
        return {
          statusCode: data.status,
          body: data,
        };
      }, FORECAST_DELAY);
    })
    .catch((err) => {
      console.error("Open Weather Map API Error:", err.message);
      return {
        statusCode: 200,
        body: generateFakeForecast(),
      };
    });
}
