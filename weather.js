const http = require('http');

const apikey = 'e312dbeb8840e51f92334498a261ca1d';
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
//This file, node is the requestor, not the responder

//the http.get method takes 2 args:
//1. WHERE (endpoint)
//2. Code to run when back, with the data as a param
const request = http.get(weatherUrl, (theResponse)=>{
	// console.log(theResponse);
	//1. What event to do X on
	//2. callback to run, when event happens
	let weatherData = '';
	//data is a built in event for response data
	theResponse.on('data', (chunkOfData)=>{
		console.log(chunkOfData);
		console.log(`\n`);
		weatherData += chunkOfData;
	})
	//end is built in event for response data
	theResponse.on('end', ()=>{
		console.log(JSON.parse(weatherData));
	})

});