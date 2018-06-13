const fs = require('fs');
var file1 = process.argv[2];
var file2 = process.argv[3];
var output = process.argv[4];

fs. readFile(file1, function(err, buffer){
	if(err){
		console.log(err.message);
		return;
	}
	var contents = buffer.toString();
// console.log(contents)
	

fs.readFile(file2, function(err,buffer1){
	if(err){
		console.log(err.message);
		return;
	}
	var contents2 = buffer1.toString();
// console.log(contents2);

	let arr1 = contents.split("\r\n");
	// console.log(arr1);
	let arr2 = contents2.split("\r\n");
	// console.log(arr2);
let arr3 = [arr1[0], arr2[0], arr1[1], arr2[1],arr1[2], arr2[2],];
// console.log(arr3);
let final = arr3.join("\r\n");
console.log(final);
	
	fs.writeFile(output, final, function(err){
		if(err){
			console.log(err.message);
			return;
		}console.log('It worked!');
	})

});
});
