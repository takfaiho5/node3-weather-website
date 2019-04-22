const request = require('request')

const forecast = (lat, long , callback)  => {
    const url = 'https://api.darksky.net/forecast/1a051ea2909eb553cd2eaa2dee208bf5/'+lat+','+long+'?lang=zh-tw'

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Cannot connect to server !' , undefined)
        }else if (body.error) {
            callback('No such place was found !' , undefined)
        }else{
            const currently = body.currently;
            callback(undefined , `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. This high Today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${currently.windGust}% change of rain. `)
        }
    })
}

module.exports = forecast