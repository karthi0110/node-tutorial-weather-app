const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path of express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and view path
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'KS'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        content: 'What to say?',
        name: 'KS'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Section',
        content: 'I\'m here to help you',
        name: 'KS'
    })
})

app.get('/help/*', (req,res) => {
    res.render('help-articles',{
        title: 'Help articles',
        content: 'Aritcle is not found',
        name: 'Karthik'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error) {
            return res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if(error) {
                    return res.send({error})
                } else {
                    return res.send({
                        forecast: data,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/product', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Filter is not applied'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        content: 'Page not found!',
        name: 'Karthik'
    })
})

app.listen(3000, () => {
    console.log('Server is up!')
})