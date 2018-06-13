const fs = require('fs');
var fileName = process.argv[2];
var output = process.argv[3];

	fs.readFile(fileName, function(err, buffer){
		if(err){
			console.log(err.message);
			return;
		}
		var contents = buffer.toString();

		fs.writeFile(output, contents, function(err){
			if(err){
				console.log(err.message);
				return;
			}
			console.log('It worked!');
		});
	});