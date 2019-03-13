/*
 * weather-api-client
 * Copyright (c) Luca J
 * MIT License
 */

const weather = require('./weatherLogic');
const cityNames = process.argv.slice(2);

if (cityNames[0].match(/^-[1-9]$|-1[0-6]$/)) {
  const numberOfDays = cityNames[0].substring(1);
  for (city of cityNames.slice(1)) {
    weather.getMultiDay(city, numberOfDays);
  }

} else if (cityNames[0] == '--today') {
  for (city of cityNames.slice(1)) {
    weather.getToday(city);
  }

} else if (cityNames[0] == '--forecast') {
  for (city of cityNames.slice(1)) {
    weather.getFiveDays(city);
  }

} else {
  for (city of cityNames) {
    weather.getNow(city);
  }
}
