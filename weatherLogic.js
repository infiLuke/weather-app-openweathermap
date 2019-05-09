/*
 * weather-api-client - logic
 * Copyright (c) 2018 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const https = require('https');
const http = require('http');
const colors = require('colors');
const api = require('./api.json');

/**
 * Module variables.
 * @private
 */

const apiUrl = 'https://api.openweathermap.org/data/2.5/';

/**
 * Module exports.
 * @public
 */

module.exports.getNow = queryCurrentWeather;
module.exports.getToday = queryTodaysForecast;
module.exports.getFiveDays = queryFiveDayForecast;
module.exports.getMultiDay = queryMultiDayForecast;

/**
 * Log error messages to stderr.
 *
 * @param {Error} error object
 * @private
 */

function printError(error) {
  console.error(error.message);
}

/**
 * Format a unix timestamp into human-readable format.
 *
 * @param {int} timestamp
 * @private
 */

function formatTimestamp(timestamp) {
  const months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  const dateTime = new Date(timestamp * 1000);
  const year = dateTime.getFullYear();
  const month = months[dateTime.getMonth()];
  const date = dateTime.getDate();
  const hour = dateTime.getHours();
  const min = dateTime.getMinutes();
  const formattedDateTime = hour + ':' + min + ` (${date} ${month} ${year})`

  return formattedDateTime;
}

/**
 * Format and print the current weather from a json object.
 *
 * @params {Object} weather - json object holding weather data
 */

function printCurrentWeather(weather) {
  const weatherInfoTime = formatTimestamp(weather.dt);
  const sunriseTime = formatTimestamp(weather.sys.sunrise);
  const sunsetTime = formatTimestamp(weather.sys.sunset);
  const message = `The temperature in ${weather.name}, ${weather.sys.country} is ${weather.main.temp} degrees celsius with ${weather.weather[0].description}.
  - ${weather.clouds.all}% cloud coverage and ${weather.main.humidity}% humidity
  - a current low of ${weather.main.temp_min} and a high of ${weather.main.temp_max} celsius
  - sunrise: ${sunriseTime}
  - sunset:  ${sunsetTime}
  - weather data was collected at ${weatherInfoTime}`

  console.log(message.green);
  console.log(`  -----------------------------------------------------------`.cyan);
}

/**
 * Format and print a forecast for todays weather from a json object.
 *
 * @params {Object} weather - json object holding weather data
 */

function printTodaysForecast(weather) {
  console.log(weather);
}

/**
 * Format and print a five day weather forecast from a json object.
 *
 * @params {Object} weather - json object holding weather data
 */

function printFiveDayForecast(weather) {
  console.log(weather);
}

/**
 * Format and print a weather forecast for a variable amount of days from a
 * json object.
 *
 * @params {Object} weather - json object holding weather data
 */

function printMultiDayForecast(weather) {
  console.log(weather);
}

/**
 * Query an api with a GET request to a given uri  secret, format and print the
 * returned json object.
 *
 * @params {string} uri string for the api
 * @params {Function} printMode to be used on the query result
 */

function getWeatherData(uri, printMode) {
  // try for incorrect uri
  try {
    const request = https.get(uri + api.key, response => {

      if (response.statusCode === 200) {
        let body = '';
        response.on('data', data => {
          body += data;
        });
        response.on('end', () => {
          printMode(JSON.parse(body));
        });
      } else if (response.statusCode === 401) {
        console.log(`HTTP Status Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - returned. Your API key might be invalid or the service you are trying to access might be a premium feature.`);
      } else {
        // handle erroneous api http status codes
        printError(new Error(`HTTP Status Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - returned.`));
      }
    });
    // handle error event for unresponsive uri
    request.on('error', error => printError(error));

  // handle faulty uri exception
  } catch(error) {
    printError(error);
  }
}

/**
 * Query the api and print the current weather for a given city.
 *
 * @params {string} cityname
 */

function queryCurrentWeather(city) {
  getWeatherData(`${apiUrl}weather?q=${city}&units=metric&APPID=`,
      printCurrentWeather);
}

/**
 * Query the api and print todays weather forecast for a given city.
 *
 * @params {string} cityname
 */

function queryTodaysForecast(city) {
  getWeatherData(`${apiUrl}forecast?q=${city}&units=metric&APPID=`,
      printTodaysForecast);
}

/**
 * Query the api and print a five day forecast for a given city.
 *
 * @params {string} cityname
 */

function queryFiveDayForecast(city) {
  getWeatherData(`${apiUrl}forecast?q=${city}&units=metric&APPID=`,
      printFiveDayForecast);
}

/**
 * Query the api and print forecast for a single city and a specific number of
 * days. (2019-01-20) API Resource now only available for paid accounts.
 *
 * @params {string} cityname
 * @params {number} number of days to forcast
 */

function queryMultiDayForecast(city, days) {
  getWeatherData(`${apiUrl}forecast/daily?q=${city}&units=metric&cnt=${days}&APPID=`,
      printMultiDayForecast);
}

