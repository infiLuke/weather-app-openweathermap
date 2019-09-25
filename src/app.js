/*
 * weather-api-client - main
 * Copyright (c) 2018 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Application dependencies.
 * @private
 */

const { route } = require('./controller');

/**
 * Application variables.
 * @private
 */

const cityNames = process.argv.slice(2);

/**
 * Application Startup.
 * @private
 */

route(cityNames);

