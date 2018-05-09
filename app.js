const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const keys = require("./config/config.js")

// configure top-level options using .options (because there aren't multiple arguments)
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: "Get the data from this address",
            string: true
        }
    })
    .help()
    .alias("help", "h") // add an alias for the help command (the h flag)
    .argv;

// The options object, and callback function. The json: true, allows us to to convert it to an object automatically, from a JSON format.
// The final bit of random numbers is the geolocation of the user. This allows us to avoid low streaming limits that prevent bots, by giving us a unique ID.

geocode.geocodeAddress(argv.address, (error, results) => {
    if(error){
        console.log(error);
    } else {
        geocode.findWeather(results,keys,(error, results) => {
            console.log(results.summary, results);
        });
    }
});