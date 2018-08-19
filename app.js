const weather = require('./weatherLogic');
const cityNames = process.argv.slice(2);

for (city of cityNames) {
  weather.get(city);
}
