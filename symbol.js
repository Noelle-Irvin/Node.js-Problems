//prior to ES6 (2015)...
//there were 5 primitive data types:
//1. Boolean 
console.log(true === true);
//2. undefined
console.log(undefined === undefined);
//3. null value
console.log(null === null);
//4. String
console.log('Hello' === 'Hello');
//5. numbers
console.log(2 === 2);

//A primitive is anything that's NOT an object.
//Primitives are also stored by VALUE
//Primitives are also built into the language at the lowest level

console.log({} === {});

let obj = {};
let obj2 = {};
console.log(obj == obj2);

let obj3 = obj;
obj3.newProp = "Dario";
console.log(obj);

console.log(Symbol() === Symbol());
//Symbol = a something. an identifier. a reference.
//Reasons: ABSOLUTELY UNIQUE. No name collisions

const CARMAKE = Symbol(`carMake`);
const CARMODEL = Symbol(`carModel`);
const CARCOLOR = Symbol(`carColor`);

//All CAPS is how you get mad on reddit.
//And how you let other programmers know that this is a constant.

class Car{
	constructor(make, model, color){
		this[CARMAKE] = make;
		this[CARMODEL] = model;
		this[CARCOLOR] = color;
	}
	get color(){
		return this[CARCOLOR];
	}
	set color(newColor){
		this[CARCOLOR] = newColor;
	}
}

const jimsCar = new Car(`Tesla`, `S`, `Black`);
console.log(jimsCar.color);
jimsCar.color = `Red`;
console.log(jimsCar.color);

