# CLI Weather App
for the [openweathermap.org](https://openweathermap.org) api

## Installation
1. Copy the project folder to your local machine
4. Download and install the latest version of [node.js](https://nodejs.org/en/)
3. Install project dependencies with npm (comes with node.js):
  1. Open a shell in the project folder.
  2. type `npm install` to install all necessary dependencies
4. Request a personal api key from [openweathermap.org/api](https://openweathermap.org/api)
5. Put the api key in a file called `api.json` in the project folder:

#### Example: `api.json`
```
    {
        "key": "22a0f"
    }
```

## How To Use The Software
Execute `app.js` via command line with the current version of node.js (v10.0+).
`app.js` takes one or more city name(s) as arguments.
City names that include spaces have to be passed to the app in double quotes.

### Examples
    node app.js singapore honolulu osaka
    node app.js "hong kong" "los angeles"
