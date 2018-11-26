const https = require('https');
const http = require('http');
const colors = require('colors');
const api = require('./api.json');

function convertDate(timestamp) {
  let months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  let a = new Date(timestamp * 1000);
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let time = hour + ':' + min + ` (${date} ${month} ${year})`
  return time;
}

// print error messages
function printError(error) {
  console.error(error.message);
}

// format &amp; print important info from weather.json
function printWeatherInfo(weather) {
  // log out whole json file
  // console.log(weather);
  // format and select relevant info
  let weatherInfoTime = convertDate(weather.dt);
  let sunriseTime = convertDate(weather.sys.sunrise);
  let sunsetTime = convertDate(weather.sys.sunset);
  let message = `The temperature in ${weather.name}, ${weather.sys.country} is ${weather.main.temp} degrees celsius with ${weather.weather[0].description}.\n` +
      `  - ${weather.clouds.all}% cloud coverage and ${weather.main.humidity}% humidity\n` +
      `  - a current low of ${weather.main.temp_min} and a high of ${weather.main.temp_max} celsius\n` +
      `  - sunrise: ${sunriseTime}\n` +
      `  - sunset:  ${sunsetTime}\n` +
      `  - weather data was collected at ${weatherInfoTime}\n`
  console.log(message.green);
  console.log(`  -----------------------------------------------------------`.cyan);
}

function getWeatherData(city) {
  // try for incorrect URL
  try {
    // connect
    let request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`, response => {
      // check for http status code
      if (response.statusCode === 200) {
        let body = '';
        // read
        response.on('data', data => {
          body += data;
        });
        // parse
        response.on('end', () => {
          let weatherData = JSON.parse(body);
          printWeatherInfo(weatherData);
        });
      } else {
        // handle erroneous api http status codes
        let message = `HTTP Status Error Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - occured while trying to retrieve data for ${city}`;
        let statusCodeError = new Error(message);
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
