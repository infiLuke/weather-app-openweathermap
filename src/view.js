/*
 * weather-api-client - views
 * Copyright (c) 2019 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const colors = require('colors');

/**
 * Module exports.
 * @public
 */

module.exports.printCurrentWeather = printCurrentWeather;
module.exports.printTodaysForecast = printTodaysForecast;
module.exports.printFiveDayForecast = printFiveDayForecast;
module.exports.printMultiDayForecast = printMultiDayForecast;

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
 * @param {Object} weather - json object holding weather data
 * @public
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
 * @param {Object} weather - json object holding weather data
 * @public
 */

function printTodaysForecast(weather) {
  console.log(weather);
}

/**
 * Format and print a five day weather forecast from a json object.
 *
 * @param {Object} weather - json object holding weather data
 * @public
 */

function printFiveDayForecast(weather) {
  console.log(weather);
}

/**
 * Format and print a weather forecast for a variable amount of days from a
 * json object.
 *
 * @param {Object} weather - json object holding weather data
 * @public
 */

function printMultiDayForecast(weather) {
  // currently a premium feature.
  console.log(weather);
}
