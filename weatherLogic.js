const https = require('https');
const api = require('./api.json');

// format &amp; print important info from weatherData.json
function printWeatherInfo(weather) {
  console.log(weather);
  var a = new Date(weather.dt * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ':' + min + ` (${date} ${month} ${year})`
  const message = `Current Time: ${time}\n` +
      `The temperature in ${weather.name} is ${weather.main.temp} Celsius with ${weather.weather.description}.\n` +
      `${weather.clouds.all}% cloud coverage and ${weather.main.humidity}% humidity.\n` +
      `A low of ${weather.main.temp_min} and a high of ${weather.main.temp_max} Celsius.\n`
  console.log(message);
}

function getWeatherData() {
  // connect
  const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=${api.key}`, response => {
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
