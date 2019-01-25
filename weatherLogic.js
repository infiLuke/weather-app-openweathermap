const https = require('https');
const http = require('http');
const colors = require('colors');
const api = require('./api.json');

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

// print error messages
function printError(error) {
  console.error(error.message);
}

// format &amp; print important info from weather.json
function printWeatherInfo(weather) {
  // format and select relevant info
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

function getWeatherData(city) {
  // try for incorrect URL
  try {
    // connect
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`, response => {

      // check for http status code
      if (response.statusCode === 200) {
        let body = '';
        // read
        response.on('data', data => {
          body += data;
        });
        // parse
        response.on('end', () => {
          const weatherData = JSON.parse(body);
          printWeatherInfo(weatherData);
        });
      } else {
        // handle erroneous api http status codes
        const message = `HTTP Status Error Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - occured while trying to retrieve data for ${city}`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }

    });
    // handle error event for unresponsive url
    request.on('error', error => printError(error));
  } catch(error) {
    // handle faulty url exception
    printError(error);
  }
}


module.exports.get = getWeatherData;
