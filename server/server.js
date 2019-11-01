const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const ENV = process.env.ENVIRONMENT;
let MOVIE_API_KEY = process.env.PROD_MOVIE_API_KEY;
let sourceUrl = "http://www.omdbapi.com";

if (ENV === 'dev'){
    MOVIE_API_KEY = process.env.DEV_MOVIE_API_KEY;
    sourceUrl = "http://localhost:3001"
}

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api/movies_data', (req, res) => {
    let userInput = req.query.s;

    if (userInput === undefined || userInput.trim() === ''){
        res.status(404).json({"Status": "Input is invalid." });
        console.log("Input is empty space");
    }else{
        let url = sourceUrl + '/?s=' + encodeURIComponent(userInput.trim()) + '&apikey=' + MOVIE_API_KEY;

        axios
        .get(url)
        .then((response) => {
            if (response.data.Response === 'False'){ res.status(200).json(response.data); }
            else{
                return Promise.all(response.data.Search.map((movie, index) => {
                    let tempUrl = sourceUrl + '/?i=' + movie.imdbID + '&apikey=' + MOVIE_API_KEY;

                    return axios
                    .get(tempUrl)
                    .then((tempResponse) => {
                        return Promise.resolve({id: index, ...movie, Plot:  tempResponse.data.Plot}); 
                    })
                    .catch(error => {
                        console.log(error);
                        return Promise.reject(error);
                    });
                })).then((newData) =>  {
                    res.status(200).json({Search: newData, totalResults: response.data.totalResults, Response: response.data.Response});        
                }).catch(error => {
                    console.log(error);
                    res.status(404).json({"Status": "Unable to query all of the request data at this time.  Try again later." });
                });
            }
        })
        .catch(error => {
            res.status(404).json({"Status": "Unable to query the request data at this time.  Try again later." });
            console.log(error);
        });
    }
});  

app.get('/api/movie', (req, res) => {
    let userInput = req.query.i;

    if (userInput === undefined || userInput.trim() === ''){
        res.status(404).json({"Status": "Input is invalid." });
        console.log("Input is empty space");
    }else{
        let url = sourceUrl + '/?i=' + encodeURIComponent(userInput.trim()) + '&apikey=' + MOVIE_API_KEY;

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
