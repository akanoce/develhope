var readlineSync = require('readline-sync');

// Gestire un magazzino attraverso le strutture dati che conosciamo
// L'utente potrà inserire da cli gli oggetti dentro il magazzino

//Dichiarazione magazzino vuoto (array vuoto)
let warehouse = [];

//Questa funzione utilizza readline-sync per chiedere in input all'utente delle informazioni, che utilizza per creare un nuovo oggetto
//returns the inserted object 
const insertItem = () => {
	const name = readlineSync.question("Inserisci il nome dell'oggetto ");

	const price = readlineSync.question("Inserisci il prezzo dell'oggetto ");

	const qty = readlineSync.question("Inserisci la quantita dell'oggetto ");

	return {
		name: name,
		price: price,
		qty: qty
	};
};

//Check if the user wanna continue the program -> boolean (true/false)
const askUserForContinuation = () => {
	while (true) {
		const keepRunningAnswer = readlineSync.question('Vuoi continuare ad inserire elementi (y/n)? ');
		switch (keepRunningAnswer) {
			case 'y':
				return true;
			case 'n':
				return false;
			default:
				console.log('Scelta errata!');
				break;
                //exit the switch block, coming back to the while one (user do not exit while block until a choiche is correct (y/n))
		}

        //Equivalent to the switch above, but more verbose 
		// if (keepRunningAnswer === 'y') return true;
		// else if (keepRunningAnswer === 'n') return false;
		// else console.log('Scelta errata!');
	}
};

let keepRunning = true;
while (keepRunning) {
	const elementoInserito = insertItem();
	// console.log(elementoInserito);
	warehouse.push(elementoInserito);
	console.log(warehouse);

	keepRunning = askUserForContinuation();
}
