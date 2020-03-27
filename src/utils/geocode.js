const request = require('request');

const geoCode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianBlZHJ5cyIsImEiOiJjazdtcXN3aWQwZWV0M2xwOWo4NXR6eGhnIn0.G-Ao6P6FchWDXFiwy9Wz2Q&limit=1';
    
    request( 
    {
        url,
        json: true
    }, (error,  {body}) => 
    {
        const errorCheck = body.features.length;
        if (error)
        {
            callback('Unable to connect to location services!', {undefined, undefined, undefined});
        }else if(errorCheck === 0)
        {
            callback('Invalid location. Try another search.', {undefined, undefined, undefined});
        }else
        {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const  location = body.features[0].place_name;
            callback(undefined, 
            {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geoCode;