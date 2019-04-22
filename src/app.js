const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

//setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//static directory 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'KH'
    })
})

app.get('/about', (req, res) => { 
    res.render('about',{
        title: "about",
        name: "KH"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide a address'
        })
    }

    geocode(req.query.address , (error, {latitude , longtitude , location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }

        forecast(latitude, longtitude, (error, forecastString) => {
            if(error){
                return res.send({
                    error : error
                })
            }

            res.send({
                forecast: forecastString,
                location: location,
                name: 'KH',
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'This is helpful text',
        name: 'KH'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404' , { 
        title: 'Article not found',
        errorMsg: 'Help articel not found' ,
        name: 'KH'
    })
})

app.get('*', (req, res) => {
    res.render('404' , { 
        title: '404',
        errorMsg: '404 error, page not found'  ,
        name: 'KH'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})