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
  const months = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ];
  const clientTimeZoneOffset = new Date().getTimezoneOffset() * 60;
  const dateTime = new Date((timestamp + clientTimeZoneOffset) * 1000);
  const year = dateTime.getFullYear();
  const month = months[dateTime.getMonth()];
  const date = dateTime.getDate();
  const hour = dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours();
  const min = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();
  const formattedDateTime = hour + ':' + min + ` (${date} ${month} ${year})`;

  return formattedDateTime;
}

/**
 * Format and print the current weather from a json object.
 *
 * @param {Object} weather - json object holding weather data
 * @public
 */

function printCurrentWeather(weather) {
  const timezone = weather.timezone / 60 / 60;
  const timezoneFormat = timezone > 0 ? '+ ' + timezone : '- ' + Math.abs(timezone);
  const weatherInfoTime = formatTimestamp(weather.dt + weather.timezone);
  const sunriseTime = formatTimestamp(weather.sys.sunrise + weather.timezone);
  const sunsetTime = formatTimestamp(weather.sys.sunset + weather.timezone);
  const message = `The temperature in ${weather.name}, ${weather.sys.country} is ${weather.main.temp} degrees celsius with ${weather.weather[0].description}.
  - ${weather.clouds.all}% cloud coverage and ${weather.main.humidity}% humidity
  - a current low of ${weather.main.temp_min} and a high of ${weather.main.temp_max} celsius
  - sunrise: ${sunriseTime}
  - sunset:  ${sunsetTime}
  - weather data was collected at ${weatherInfoTime} - UTC ${timezoneFormat}`;

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
  const timezone = weather.city.timezone / 60 / 60;
  const timezoneFormat = timezone > 0 ? '+ ' + timezone : '- ' + Math.abs(timezone);
  const sunriseTime = formatTimestamp(weather.city.sunrise + weather.city.timezone);
  const sunsetTime = formatTimestamp(weather.city.sunset + weather.city.timezone);
  const name = weather.city.name;
  const country = weather.city.country;
  const output = `Todays weather for ${name}, ${country} ${sunriseTime.substr(6)} UTC ${timezoneFormat}:
  - sunrise: ${sunriseTime}
  - sunset: ${sunsetTime}
`.cyan;

  console.log(output);

  for (let i = 0; i < 9; i++) {
    const datetime = formatTimestamp(weather.list[i].dt + weather.city.timezone);
    const time = datetime.substr(0, 5);
    const temp = weather.list[i].main.temp;
    const tempMin = weather.list[i].main.temp_min;
    const tempMax = weather.list[i].main.temp_max;
    const description = weather.list[i].weather[0].description;
    const humidity = weather.list[i].main.humidity;
    const clouds = weather.list[i].clouds.all;

    console.log(`  ${time} - ${temp}°C (${tempMin} - ${tempMax}) - ${description} - ${humidity}% humidity - ${clouds}% cloud coverage`.green);
  }

  console.log(`  -----------------------------------------------------------`.cyan);
}

/**
 * Format and print a five day weather forecast from a json object.
 *
 * @param {Object} weather - json object holding weather data
 * @public
 */

function printFiveDayForecast(weather) {
  const timezone = weather.city.timezone / 60 / 60;
  const timezoneFormat = timezone > 0 ? '+ ' + timezone : '- ' + Math.abs(timezone);
  const sunriseTime = formatTimestamp(weather.city.sunrise + weather.city.timezone);
  const sunsetTime = formatTimestamp(weather.city.sunset + weather.city.timezone);
  const name = weather.city.name;
  const country = weather.city.country;
  const output = `Todays weather for ${name}, ${country} ${sunriseTime.substr(6)} UTC ${timezoneFormat}:
  - sunrise: ${sunriseTime}
  - sunset: ${sunsetTime}
`.cyan;

  console.log(output);

  for (let i = 0; i < 40; i++) {
    const datetime = formatTimestamp(weather.list[i].dt + weather.city.timezone);
    const time = datetime.substr(0, 5);
    const temp = weather.list[i].main.temp;
    const tempMin = weather.list[i].main.temp_min;
    const tempMax = weather.list[i].main.temp_max;
    const description = weather.list[i].weather[0].description;
    const humidity = weather.list[i].main.humidity;
    const clouds = weather.list[i].clouds.all;

    console.log(`  ${time} - ${temp}°C (${tempMin} - ${tempMax}) - ${description} - ${humidity}% humidity - ${clouds}% cloud coverage`.green);
  }

  console.log(`  -----------------------------------------------------------`.cyan);
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
