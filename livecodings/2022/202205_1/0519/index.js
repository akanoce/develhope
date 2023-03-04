const rl = require('readline-sync');

const warehouse = [];

function createItemFromUserInput() {
	const name = rl.question('Insert the name ');

	const price = rl.question('Insert the price ');

	const qty = rl.question('Insert the qty ');

	return {
		name,
		price,
		qty
	};
}

function deleteItemFromUserInput(list) {
	const index = rl.question('Che elemento vuoi eliminare (indice) ');
	console.log(index, list, list.length);
	const newList = list.concat();

	if (index >= 0 && index <= list.length - 1) {
		console.log(`Posso eliminare ${index}`);
		newList.splice(index, 1);
		return newList;
	} else {
		console.log("L'indice non è valido");
	}
}

//Chiede all'utente se vuole continuare il programma, restituendo la sua scelta come un booleano(vero/falso)
const wannaContinueProgram = () => {
	while (true) {
		const answer = rl.question('Vuoi continuare il programma (y/n) ');
		switch (answer.toLowerCase()) {
			case 'y':
				return true;
			case 'n':
				return false;
			default:
				console.log('Scelta errata');
		}

		//Fa la stessa identica cosa dello switch sopra
		// if (answer === 'y') return true;
		// else if (answer === 'n') return false;
		// else {
		// 	console.log('Scelta errata');
		// }
	}
};

let keepRunning = true;
while (keepRunning) {
	let isMenuChoiceCorrect = true;

	do {
		console.log('Benvenuto nel magazzino');
		console.log('1 - Inserisci un elemento');
		console.log('2 - Mostra tutti gli elementi');
		console.log('3 - Elimina un elemento');

		const action = rl.question('Cosa vuoi fare? ');
		switch (action) {
			case '1':
				const item = createItemFromUserInput();
				warehouse.push(item);
				break;
			case '2':
				console.log(`Il magazzino contiene ${warehouse.length} elementi`);
				console.log(warehouse);
				break;
			case '3':
				const newList = deleteItemFromUserInput(warehouse);
				console.log(newList);
				break;
			default:
				isMenuChoiceCorrect = false;
				console.log('Opzione non valida');
				break;
		}
	} while (!isMenuChoiceCorrect);
	// const item = createItemFromUserInput();
	// warehouse.push(item);
	keepRunning = wannaContinueProgram();
}
