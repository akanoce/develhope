
const array1 = [ { name: 'erik', price: 999 }, { name: 'gianni', qty: 10 }, 10, 'sonounastringa' ];
// const array2 = [ [ 1, 2, 3 ], 5, 6 ];

// const x = {
// 	name: 'erik',
// 	price: 999
// };

// x.name = 'giacomo'
// x.price = 1000

// console.log('array1', array1, array1.length);
// console.log('array2', array2, array2.length);
// console.log('PUSH su array', array1.push(10), array1);

console.log(9 + '9');

array1.forEach((elemento) => {
	if (typeof elemento === 'number') {
		elemento += 15;
		console.log('numero', elemento);
	}

	if (typeof elemento === 'string') {
		elemento = 'SonounaAtringaNuova';
		console.log('string', elemento);
	}

	if (typeof elemento === 'object') {
		// se il prezzo è definito, diventa 200, altrimenti 100
		if (elemento.price) {
			elemento.price = 200;
		} else {
			elemento.price = 100;
		}

		//se la quantita e definita, diventa 20, altrimenti 50
		if (elemento.qty) {
			elemento.qty = 20;
		} else {
			elemento.qty = 50;
		}

		if (elemento.name === 'erik') {
			elemento.name = 'giacomo';
		} else if (elemento.name === 'gianni') {
			elemento.name = 'fabrizio';
		}

		// se il nome e erik diventa giacomo
		//se gianni diventa fabrizio

		console.log('object', elemento);
	}

	// console.log(typeof elemento);

	// elemento.name = 'fabrizio';
});

// console.log(array1);

// console.log('POP su array', array1.pop(), array1);
// console.log('CONCAT array1 su array2: ', array1.concat(array2));