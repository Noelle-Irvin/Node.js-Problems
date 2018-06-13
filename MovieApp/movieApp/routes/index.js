//Include express
var express = require('express');
//set up the router from the express module
var router = express.Router();
//get request. We have this because we npm installed it.
//We need it to make http requests.
const request = require('request');

//Get our credentials from our non-git file to keep them safe
//from the scary internet
const creds = require('../config/creds.js');
const api_Key = creds.apiKey;

//Set up the urls we are going to use over and over
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl  = `${apiBaseUrl}/movie/now_playing?api_key=${api_Key}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', function(req, res, next) {
	//Go to the movie api and get the current playing data.
	request.get(nowPlayingUrl, (error,response, movieData)=>{
		const parsedData = JSON.parse(movieData);
		console.log(parsedData);
		res.render('index', { 
			nowPlayingData: parsedData.results,
			imageBaseUrl
		});
	})
  
});

//ROUTE FOR /movie/1234
router.get('/movie/:movieId', (req, res)=>{
	// res.json(req.params);
	const movieId = req.params.movieId;
	//build the api url for THIS movie
	const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${api_Key}`;
	request.get(thisMovieUrl, (error, response, movieData)=>{
		const parsedData = JSON.parse(movieData);
		// res.json(parsedData);
		//Send a view this movie's data so the user can see it
		res.render('single-movie', {
			currentMovie: parsedData,
			imageBaseUrl
		})
	})
})

module.exports = router;
