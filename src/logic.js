/*
 * weather-api-client - logic
 * Copyright (c) 2018 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const https = require('https');
const http = require('http');
const api = require('../api.json');

/**
 * Module variables.
 * @private
 */

const apiUrl = 'https://api.openweathermap.org/data/2.5/';

/**
 * Module exports.
 * @public
 */

module.exports = getWeatherData;

/**
 * Log error messages to stderr.
 *
 * @param {Error} error object
 * @private
 */

function logError(error) {
  console.error(error.message);
}


/**
 * Query an API with a GET request to a given uri secret, format and print the
 * returned json object.
 *
 * @param {string} uri string for the api
 * @param {Function} printMode takes javascript object and prints it's contents.
 * @public
 */

function getWeatherData(uri, printMode) {

  try {
    const request = https.get(apiUrl + uri + api.key, response => {

      if (response.statusCode === 200) {
        let body = '';

        response.on('data', data => {
          body += data;
        });

        response.on('end', () => {
          printMode(JSON.parse(body));
        });

      } else if (response.statusCode === 401) {
        console.log(`HTTP Status Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - returned. Your API key might be invalid or the service you are trying to access might be a premium feature.`);
      } else {
        // handle a non-200 http status code response
        logError(new Error(`HTTP Status Code (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}) - returned.`));
      }
    });
    // handle erroneous event: server is unresponsive
    request.on('error', error => printError(error));

  // handle invalid URI string
  } catch(error) {
    logError(error);
  }
}
