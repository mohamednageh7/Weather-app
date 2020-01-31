const request = require('request')
const geoCode = (address,callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYW1lZC1uYWdlaCIsImEiOiJjazV6ZW9wc2MxaDM0M21wb281ODNsMTl6In0.Wj--NOKE4nJ6bm03Vr0uSg&limit=1`;

    request({url :mapboxUrl,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to location service!',undefined)
        } else if(response.body.features.length === 0){
            callback('unable to find location',undefined)
        } else {
            const {center,place_name} = response.body.features[0];
            callback(undefined,{
                latitude: center[0],
                longtitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports =  geoCode
