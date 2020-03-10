const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2FydGhpc2tiIiwiYSI6ImNrNzk4aTZmNzBvNGYzZXBma3g1Z2g1MGcifQ.C5SW2WkW6x0G5o6pOi9pJw&limit=1"
    request({url, json: true},(error, { body }) =>{
       if(error) {
           callback('Unable to connect server', undefined)
       } else if(body.features.length === 0 ){
           callback('Unable to find location, try another search!', undefined)
       } else {
           const data = body; 
           callback(undefined, {
               latitude: data.features[0].center[1],
               longitude: data.features[0].center[0],
               location: data.features[0].place_name
           })
       }
    })
}

module.exports = geocode