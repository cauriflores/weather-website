const request = require("request");

const forecast = (latitude, longitude, callback) => {
  let url =
    "http://api.weatherstack.com/current?access_key=6147e9c58a1af63b8738a1411222cd1a&query="
    + latitude +
    ","
    +
    longitude +
    "&units=m";
  request({ url , json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out `
      );
    }
  });
};

module.exports = forecast;
