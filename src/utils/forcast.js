const request = require('request')

const forcast = (longtitude,lattitude,location,callback) => {
    const url = `https://api.darksky.net/forecast/97f568b66b35016d7f9c7a074d55c735/${lattitude},${longtitude}?lang=en`;

    request({url,json:true}, (error,response) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if(response.body.error){
            callback('Unable to find location',undefined)
        } else {
            const {temperature,precipProbability} = response.body.currently
            const {summary} = response.body.daily.data[0]
            callback(undefined,`In ${location} ${summary}, It is currently ${temperature} degree out. There is a ${precipProbability} % chance of rain` )
        }
    })
}

module.exports = forcast