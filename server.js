


const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
let app = express();
const ejs = require('ejs');
const PORT = process.env.PORT;
let apiKey = '43501838c68f0892763a7b7aff0e3436';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')


app.get('/', function(req, res)
{
  res.render('index', {weather: null, error: null})
})

app.post('/', function(req, res)
{
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;



request(url, function (err, response, body)
{
  if (err)
  {
    res.render('index', {weather: null, error: "Error ! Please try again!" });
  }
  else
  {
    let weather = JSON.parse(body);
    if (weather.main == undefined)
    {
      res.render('index', {weather: null, error: "Error ! Please try again!" });
    }
    else
    {
      let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`
      res.render('index', {weather: weatherText, error: null});

    }
  }
})
});



app.listen(PORT, function(err)
{
  if (err)
  {
  console.log(err);
  }
  else
  {
      console.log("App listening on port 3000");
  }
})
