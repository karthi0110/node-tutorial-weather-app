const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/246b6fe2dd0cd1d4a301a2904a2c59f6/" + latitude +','+ longitude
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect server',undefined)
        } else if(response.body.error){
            callback('Unable to fetch location!',undefined)
        } else {
            const data = response.body.currently;
            callback(undefined,"It is currently " + data.temperature + " degree out. There is a " +
            data.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast