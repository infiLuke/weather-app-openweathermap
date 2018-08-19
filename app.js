const weather = require('./weatherLogic');
const query = process.argv[2];
// city name

weather.get(query);
