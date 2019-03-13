/*
 * weather-api-client - main
 * Copyright (c) 2018 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const weather = require('./weatherLogic');

/**
 * Module variables.
 * @private
 */

const cityNames = process.argv.slice(2);

if (cityNames[0].match(/(^-[1-9]$)|(-1[0-6]$)/)) {
  const numberOfDays = cityNames[0].substring(1);
  for (let city of cityNames.slice(1)) {
    weather.getMultiDay(city, numberOfDays);
  }

} else if (cityNames[0] == '--today') {
  for (let city of cityNames.slice(1)) {
    weather.getToday(city);
  }

} else if (cityNames[0] == '--forecast') {
  for (let city of cityNames.slice(1)) {
    weather.getFiveDays(city);
  }

} else {
  for (let city of cityNames) {
    weather.getNow(city);
  }
}
