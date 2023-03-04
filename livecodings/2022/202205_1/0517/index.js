var readlineSync = require('readline-sync');
var fs = require('fs');

//Inizializzo un magazzino vuoto
let warehouse = [];

//Show the main menu, providing an interface to the application functions (each user choice, land to a specific function)
const showMenu = () => {
	console.log('Benvenuto nel nostro magazzino! \n');

	console.log('1 - Inserisci un elemento \n');
	console.log('2 - Elimina un elemento \n');
	console.log('3 - Mostra il magazzino \n');
	console.log('4 - Esporta il magazzino \n');
	console.log('5 - Importa il magazzino \n');

	const choice = readlineSync.question('Digita la tua scelta \t');
	console.log(choice, typeof choice);
	switch (choice) {
		case '1':
			const item = insertObjectFromConsole();
			warehouse.push(item);
			break;
		case '2':
			deleteObjectFromConsole();
			break;
		case '3':
			console.log(`Ci sono ${warehouse.length} elementi in magazzino `, warehouse);
			break;
		case '4':
			saveWarehouse();
			break;
		case '5':
			loadWarehouse();
			break;
		default:
			console.log('Scelta non valida!');
			break;
	}
};

// const handleUserContinuation = () => {
// 	const keepRunningConfirmation = readlineSync.question('Vuoi continuare? \t');
// 	switch (keepRunningConfirmation) {
// 		case 'y':
// 			return true;
// 		case 'n':
// 			return false;
// 		default:
// 			console.log('Scelta non valida!');
//             return handleUserContinuation()
// 	}
// };

//Serialize warehouse object to JSON, saving it in the filesystem
export const saveWarehouse = () => {
	fs.writeFileSync('./data/warehouse.json', JSON.stringify(warehouse));
};

//Unserialize local json saving, updating warehouse in order to load the previous saved data
export const loadWarehouse = () => {
	const parsedWarehouse = fs.readFileSync('./data/warehouse.json', 'utf8');
	warehouse = JSON.parse(parsedWarehouse);
	console.log(`${warehouse.length} elementi importati`);
	// console.log(parsedWarehouse, typeof parsedWarehouse)
};

//Delete warehouse object using the index passed via stdin
const deleteObjectFromConsole = () => {
	const idx = readlineSync.question('Che elemento vuoi rimuovere (indice) ?  \t');

	// idx = 3 [0,1,2]

	if (idx < 0 || idx >= warehouse.length) console.log(`L'elemento ${idx} richiesto non esiste`);
	else delete warehouse[idx];
};

//Request the user to insert a new object
const insertObjectFromConsole = () => {
	const name = readlineSync.question('Inserisci il nome \t');
	const price = readlineSync.question('Inserisci il prezzo \t');
	const qty = readlineSync.question('Inserisci la quantità \t');

	return { name: name, price: price, qty: qty };
};

//Check if the user wanna continue to use the application
const handleUserContinuation = () => {
	let isChoiceValid = false;
	while (!isChoiceValid) {
		const keepRunningConfirmation = readlineSync.question('Vuoi continuare? \t');
		switch (keepRunningConfirmation) {
			case 'y':
				return true;
			case 'n':
				return false;
			default:
				console.log('Scelta non valida!');
				break;
		}
	}
};

const main = () => {
	let keepRunning = false;
	do {
		showMenu();
		keepRunning = handleUserContinuation();
		console.log(keepRunning);
	} while (keepRunning);
};

main();
