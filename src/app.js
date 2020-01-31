const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//port for server to run
const port = process.env.PORT || 3000
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Nageh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed Nageh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        error: 'This is some helpful text.',
        title: 'Help',
        name: 'Mohamed Nageh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address term'
        })
    }

        geocode(req.query.address, (error, { longtitude, latitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
            // const { longtitude, latitude, location } = data;
            forcast(longtitude, latitude, location, (error, forcastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forcastData,
                    address: req.query.address,
                    location
                })
            })
        })

})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res) => { // wild card characters
res.send('help article not found')
})

app.get('*', (req, res) => {
    res.send('my 404')
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})