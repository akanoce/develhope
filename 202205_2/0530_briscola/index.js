const data = require('./constants');

/*Implementazione dell' algoritmo  Fisher-Yates (aka Knuth) Shuffle
 per "mischiare" gli array aka ordinarli in maniera casuale*/
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

class Gioco {
	static generateDeck = (figures, seeds) => {
		const deck = [];
		seeds.forEach((seed) => {
			for (let i = 0; i < figures.length; i++) {
				deck.push({
					...figures[i],
					seed: seed
				});
			}
		});

		return deck;
	};

	constructor(player1Name, player2Name) {
		const freshPlayerData = { score: 0, hand: [], winHands: [] };
		this.player1 = {
			name: player1Name,
			...freshPlayerData
		};
		this.player2 = {
			name: player2Name,
			...freshPlayerData
		};
		// this.deck = shuffleArray(Gioco.generateDeck(data.figures, data.seeds))
	}

	//Shuffle deck and distributes cards
	init() {
		this.deck = shuffleArray(Gioco.generateDeck(data.figures, data.seeds));
		for (let i = 0; i < 3; i++) {
			this.player1.hand = [ ...this.player1.hand, this.deck.pop() ];
			this.player2.hand = [ ...this.player2.hand, this.deck.pop() ];

			// this.player1.hand.push(this.deck.pop())
			//equivalente, ma con sideeffect (il push modifica l'array originale)
		}
	}

	//Logica principale del gioco
	runGame() {
		/*
          - Cicla fino a che il mazzo non è vuoto e nessuno ha più carte in mano
          - Esegue un turno per ogni iterazione 
          - A fine turno, se sono presenti carte nel mazzo ne distribuisce una per giocatore
          */
	}

	//Logica per la gestione dei turni
	runTurn() {
		/* 
         - Richiede ad ogni utente, in sequenza, che carta vuole posizionare (utilizzando indica array)
         - A fine turno, calcola il vincitore della mano ed inserisce il tavolo in winHands (array delle carte vinte dal giocatore)
         */
	}
}

const partita = new Gioco('Giocatore1', 'Giocatore2');
partita.init();

console.log(partita.deck.length, partita.player1.hand.length, partita.player2.hand.length);
