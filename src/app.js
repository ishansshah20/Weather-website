const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Ishan Shah'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Ishan Shah'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This your help',
        title: 'Help',
        name: 'Ishan Shah'
    })
})

app.get('/weather' ,(req, res) =>{

    if(!req.query.address) {
        return res.send({
            error: 'Address should be added!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'Article not found',
        name: 'Ishan Shah'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: '404 page not found',
        name: 'Ishan Shah'
    })
})

//to start the server at certain port
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})