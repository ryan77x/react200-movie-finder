const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const sourceUrl = "http://www.omdbapi.com";

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api/movie_data', (req, res) => {
    let userInput = req.query.s.trim();

    if (userInput === ''){
        res.status(404).json({"Status": "Input is invalid." });
        console.log("Input is empty space");
    }else{
        let url = sourceUrl + '/?s=' + encodeURIComponent(userInput) + '&apikey=' + MOVIE_API_KEY;

        axios
        .get(url)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(404).json({"Status": "Unable to query the request data at this time.  Try again later." });
            console.log(error);
        });
    }
});  

module.exports = app;
