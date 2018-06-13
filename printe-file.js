const fs = require('fs');
var fileName = process.argv[2];

console.log(printFile(fileName));

function printFile(file){
	const newFile = fs.readFileSync(file, 'utf8');
	// console.log(typeof(newFile));
	// console.log(newFile);
	// let file2 =  '';
	// fs.open('data', (chunkOfData)=>{
	// 	file2 += chunkOfData;
	// })
	let file2 = newFile.toUpperCase();
	return file2;
}