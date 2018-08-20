const https = require('https');
const colors = require('colors');
const api = require('./api.json');

function convertDate(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ':' + min + ` (${date} ${month} ${year})`
  return time;
}

// format &amp; print important info from weatherData.json
function printWeatherInfo(weather) {
  // log out whole json file
  // console.log(weather);
  // format and select relevant info
  const weatherInfoTime = convertDate(weather.dt);
  const sunriseTime = convertDate(weather.sys.sunrise);
  const sunsetTime = convertDate(weather.sys.sunset);
  const message = `The temperature in ${weather.name}, ${weather.sys.country} is ${weather.main.temp} degrees celsius with ${weather.weather[0].description}.\n` +
      `  - ${weather.clouds.all}% cloud coverage and ${weather.main.humidity}% humidity\n` +
      `  - a current low of ${weather.main.temp_min} and a high of ${weather.main.temp_max} celsius\n` +
      `  - sunrise: ${sunriseTime}\n` +
      `  - sunset:  ${sunsetTime}\n` +
      `  - the weather data was collected at ${weatherInfoTime}\n` +
      `  -----------------------------------------------------------`
  console.log(message);
}

function getWeatherData(city) {
  // connect
  const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`, response => {
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
  });
}


module.exports.get = getWeatherData;
