/*
 * weather-api-client - logic
 * Copyright (c) Luca J
 * MIT License
 */

// 'use strict';

/**
 * Module Dependencies.
 * @private
 */

const https = require('https');
const http = require('http');
const colors = require('colors');
const api = require('./api.json');

/**
 * Format a timestamp into human-readable format.
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
 * Log error messages to stderr.
 * @param {Error} error object
 * @private
 */

function printError(error) {
  console.error(error.message);
}

/**
 *
 */
const printCurrentWeather = weather => {
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
 *
 */
const printTodaysForecast = weather => {
  console.log('printing todays forecast ');
}

/**
 *
 */
const printFiveDayForecast = weather => {
  console.log('printing five day forecast');
}

/**
 *
 */
const printMultiDayForecast = weather => {
  console.log('printing multiday forecast');
}

/**
 *
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
      } else {
        // handle erroneous api http status codes
        const message = `HTTP Status Error Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - occured while trying to retrieve data for ${city}`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
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
 *
 */
function queryCurrentWeather(city) {
  getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=`,
      printCurrentWeather);
}

/**
 *
 */
function queryTodaysForecast(city) {
  getWeatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=`,
      printTodaysForecast);
}

/**
 *
 */
function queryFiveDayForecast(city) {
  getWeatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=`,
      printFiveDayForecast);
}

/*
 * (2019-01-20) Resource now only available for paid accounts.
 */
function queryMultiDayForecast(city, days) {
  getWeatherData(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=${days}&APPID=`,
      printMultiDayForecast);
  console.log(`I received ${city} for ${days} days.`);
}

/**
 * Module exports.
 * @public
 */

module.exports.getNow = queryCurrentWeather;
module.exports.getToday = queryTodaysForecast;
module.exports.getFiveDays = queryFiveDayForecast;
module.exports.getMultiDay = queryMultiDayForecast;
