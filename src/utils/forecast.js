const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=824b07410b44d4b06ae3d8ea5054002f&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url,  json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to service!' , undefined)
        }else if(body.error){
            callback('Unable to find the location! Try something else' , undefined)
        }else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast