//Tipi primitivi di JS
//string, number, undefined, null,  boolean

//Il valore non potrà mai cambiare
const x = 5;

//Variabile tradizionale, può cambiare il valore nel corso del tempo
let xx = 5;

//
var xxx = 5;

//Proprietà degli array
//Identificati dall posizione (indice)
//Il primo indicce è 0, l'ultimo array.length - 1
const xarray = [ 1, 2, 3 ];
console.log(xarray[0]);

//Concatena piu array
const newArray = xarray.concat([ 2, 3, 4 ]);
console.log(newArray);

console.log(xarray.push(5));

console.log(xarray.pop());

console.log(xarray);

xarray.push([ 5, 6 ]);

console.log(xarray);

const xy = {
	name: 'Erik'
};

console.log(xy);

xy.name = 'Karim';

console.log(xy);

console.log(xy.name, xy['name']);
