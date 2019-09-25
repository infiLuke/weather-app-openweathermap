/*
 * weather-api-client - controller
 * Copyright (c) 2019 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const view = require('./view');
const getWeatherData = require('./logic');


/**
 * Module exports.
 * @public
 */

module.exports.route = route;

/**
 * Process and route user input to the correct executing function.
 *
 * @param {Array} cityNames - Array of city names.
 */

function route(cityNames) {
  if (cityNames[0].match(/(^-[1-9]$)|(-1[0-6]$)/)) {
    const numberOfDays = cityNames[0].substring(1);

    for (let city of cityNames.slice(1)) {
      queryMultiDayForecast(city, numberOfDays);
    }

  } else if (cityNames[0] == '--today') {
    for (let city of cityNames.slice(1)) {
      queryTodaysForecast(city);
    }

  } else if (cityNames[0] == '--forecast') {
    for (let city of cityNames.slice(1)) {
      queryFiveDayForecast(city);
    }

  } else {
    for (let city of cityNames) {
      queryCurrentWeather(city);
    }
  }
}

/**
 * Query the api and print the current weather for a given city.
 *
 * @param {string} cityname
 * @public
 */

function queryCurrentWeather(city) {
  getWeatherData(
    `weather?q=${city}&units=metric&APPID=`,
    view.printCurrentWeather);
}

/**
 * Query the api and print todays weather forecast for a given city.
 *
 * @param {string} cityname
 * @public
 */

function queryTodaysForecast(city) {
  getWeatherData(
    `forecast?q=${city}&units=metric&APPID=`,
    view.printTodaysForecast);
}

/**
 * Query the api and print a five day forecast for a given city.
 *
 * @param {string} cityname
 * @public
 */

function queryFiveDayForecast(city) {
  getWeatherData(
    `forecast?q=${city}&units=metric&APPID=`,
    view.printFiveDayForecast);
}

/**
 * Query the api and print forecast for a single city and a specific number of
 * days. (2019-01-20) API Resource now only available for paid accounts.
 *
 * @param {string} cityname
 * @param {number} number of days to forcast
 * @public
 */

function queryMultiDayForecast(city, days) {
  getWeatherData(
    `forecast/daily?q=${city}&units=metric&cnt=${days}&APPID=`,
    view.printMultiDayForecast);
}

