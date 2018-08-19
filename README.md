# CLI Weather App
for the openweathermap.org api

## API key
1. request api key from openweathermap.org
2. put api key in a `api.json` file in the same folder:

    {
        "key": "22a0f"
    }

## Usage
Execute `app.js` via command line with the current version of node.js (v10.0+).
`app.js` takes one or more city name(s) as arguments
City names that include spaces have to be passed to the app in double quotes.

### Examples
    node app.js singapore honolulu osaka
    node app.js "hong kong" "los angeles"
