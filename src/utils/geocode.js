const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidGFrZmFpaG8iLCJhIjoiY2p1Y20xdTJsMGtuOTQ0cXlmdjU4MGIwYyJ9.i9ReYldc_1SxhvDl16zfpQ&limit=1&language=zh-TW";

    request({ url , json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!' , undefined)
        }else if (body.features.length === 0) {
            callback('no results was found!' , undefined)
        }else{
            callback(undefined, {
                latitude  : body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location  : body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode