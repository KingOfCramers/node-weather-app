const request = require("request");
const url = require("url");

const geocodeAddress = (address, callback) => {

    // Encode URI lets us encode the string into an actual address (using unicode characters, rather than spaces for example)
    let encodedAddress = encodeURI(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBKCw1rAnvRt9GJt9x4C2tQ7Y_z3VhYs60`,
        json: true

        // This is the callback, it's automatically returned by our arrow function.
    }, (error, response, body) => {
        if(error){
            callback("Unable to connect to Google Servers.");
        } else if (body.status === "ZERO_RESULTS"){
            callback("Unable to find that address.");
        } else if (body.status === "OK") {
            callback(undefined, { // Error message not provided if body status is OK
                // address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

const findWeather = (address,keys,callback) => {
    debugger;
    let base = "https://api.darksky.net/forecast/"
    let latitude = address.latitude.toString();
    let longitude = address.longitude.toString();
    let key = keys.key;

    debugger;

    let weatherData = base.concat(key,"/",latitude,",",longitude);

    request({
        url: weatherData,
        json: true

        // This is the callback, it's automatically returned by our arrow function.
    }, (error, response, body) => {

        debugger;
         if(error){
            callback("Unable to connect to Darksky Servers.");
        } else if (response.statusMessage === "ZERO_RESULTS"){
            callback("There's no weather data for the provided address.");
        } else if (response.statusMessage === "OK") {
            callback(undefined, {
                summary: body.currently
            });
        }
    });
}

module.exports = {
    geocodeAddress,
    findWeather
}