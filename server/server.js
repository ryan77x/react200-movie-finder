const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

// app.get('/api/weather_data', (req, res) => {
//     let cityName = req.query.q.trim();

//     if (cityName === ''){
//         res.status(404).json({"Status": "Input is invalid." });
//         console.log("Input is empty space");
//     }else{
//         let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=' + WEATHER_API_KEY;

//         axios
//         .get(url)
//         .then((response) => {
//             res.status(200).json(response.data);
//         })
//         .catch(error => {
//             res.status(404).json({"Status": "Unable to query the request data at this time.  Try again later." });
//             console.log(error);
//         });
//     }
// });  

module.exports = app;
