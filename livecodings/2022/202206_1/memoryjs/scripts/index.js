const memoryTable = document.getElementById('memory-table');
if (memoryTable) console.log('memoryTable OK', memoryTable);
else throw new Error('memory-table non trovato');

const shuffleArray = (array) => {
	const arrayCopy = [ ...array ];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		//Genero un numero casuale (indice) compreso tra 0 e i+1
		const newIndex = Math.floor(Math.random() * (i + 1));
		// console.log(`indice: ${i} nuovoIndice: ${newIndex}`)
		// console.log(newIndex)
		const temp = arrayCopy[newIndex];
		arrayCopy[newIndex] = arrayCopy[i];
		arrayCopy[i] = temp;
	}
	return arrayCopy;
};

function initializeTable() {
	//Va a generare dinamicamente tutte le card contenenti le immagini
	const imgs = [
		'alessio.jpg',
		'angelo.jpg',
		'erik.jpg',
		'giorgio.jpg',
		'giulia.jpg',
		'sciuti.jpg',
		'tiziano.jpg',
		'vincenzo.jpg',
		'emanuele.jpg'
	];
	// console.log(memoryTable.childNodes);
	const cards = [];
	imgs.forEach((img) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.setAttribute('data-name', img);

		const newImg = document.createElement('img');
		newImg.src = `img/${img}`;
		card.appendChild(newImg);

		// cards.append(newDiv)
		// cards.append(newDiv.cloneNode(true))
		memoryTable.appendChild(card);
		memoryTable.appendChild(card.cloneNode(true));
	});
	const randomCards = shuffleArray(memoryTable.childNodes);

	randomCards.forEach((node) => {
		// console.log(node);
		node.addEventListener(
			'click',
			(event) => {
                console.log(event)
				// console.log(event.target.getAttribute('src'));
				// console.log(`Click! ${this}`);
			},
			true
		);
	});
	memoryTable.append(...randomCards);
}

initializeTable();
