const  path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>
{
    res.render('index', 
    {
        title: 'Weather',
        name: 'Josh'
    });
})

app.get('/about', (req, res) =>
{
    res.render('about', 
    {
        title: 'About Me',
        name: 'Josh'
    });
})

app.get('/help', (req, res) =>
{
    res.render('help', 
    {
        title: 'Help Page',
        helpText: 'Help message placeholder.',
        name: 'Josh'
    });
})

app.get('/weather', (req, res) =>
{
    if(!req.query.address)
    {
        return res.send(
        {
            error: 'You must provide an address.'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) =>
    {
        if(error)
        {
            return res.send(
            {
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => 
        {
            if(error)
            {
                return res.send(
                {
                    error
                });
            }
            return res.send(
                {
                    forecastData,
                    location,
                    address: req.query.address
                }
            );
        });
    });
});

app.get('/products', (req, res) =>
{
    if(!req.query.search)
    {
        return res.send(
        {
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query);
    res.send(
        {
            products: []
        }
    );
});

app.get('/help/*', (req, res) =>
{
    res.render('404',
    {
        title: '404',
        errorText: 'Help article not found.',
        name:  'Josh'
    });
});

app.get('*', (req, res) =>
{
    res.render('404',
    {
        title: '404',
        errorText: 'Page not found.',
        name: 'Josh'
    });
});

app.listen(3000,  () =>
{
    console.log('server is up on port 3000');
});