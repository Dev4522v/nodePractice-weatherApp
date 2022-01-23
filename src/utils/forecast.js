const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7231025625df1d072eefafb12783d290&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out, and it feels like " +
          response.body.current.feelslike +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;
