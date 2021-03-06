const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const geocode = require("./utilities/geoLocation");
const forecast = require("./utilities/forecast");

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Cauri'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Message',
    message: 'You only have to ask to get what you want honey!',
    name: 'Cauri'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Cauri'
  })
})

app.get("/weather", (req, res) => {
  const location = req.query.address;

  if (!location) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(location, (error, data) => {
      if (error) {
        return res.send({error});
      }

      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          return res.send({error});
        }

        console.log(data.location);
        console.log(forecastData);
        res.send([
          {
            forecast: forecastData
          },
          {
            location: data.location
          },
          {
            address: req.query.address
          },
        ]);
      });
    });
  }
});


app.get('*/help/*', ( req, res) => {
  res.render('404', {
    message: 'Help article not found',
    title: 'Message for you',
    name: 'Cauri'
  })
})

app.get('*', ( req, res) => {
  res.render('404', {
    message: 'My 404 page',
    title: 'you are lost!',
    name: 'Cauri'
  })
})

app.listen(port, () => {
  console.log('El servidor está disponible en el puerto ' + port)
})

