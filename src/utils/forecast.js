const request = require('request');

const forecast =  (latitude, longitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/b16d0989fec6df023310a53000cbf0f8/' + latitude + ',' + longitude;

    request(
    {
        url,
        json: true
    }, (error, {body}) =>
    {
        if(error)
        {
            callback('Unable to connect to weather service.', {undefined, undefined, undefined});
        }else
        {
            const summary = body.daily.data[0].summary;
            const temp = body.currently.temperature;
            const precipProb = body.currently.precipProbability;
            const wind = body.currently.windSpeed;
            callback(undefined, summary + ' It is currently ' + temp + ' degrees out.' + ' There is a ' + precipProb + '% chance of rain. The current wind speed is ' + wind + "  Mph");
        }
    })
}

module.exports = forecast;