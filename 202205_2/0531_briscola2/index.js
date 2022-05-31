//Modellazione mazzo di carte da briscola
//40 carte, composte da  4 semi e 10 figure
//Figure: Asso, Due, Tre ,Quattro, Cinque,Sei , Sette, Fante, Cavallo, Re
//Semi: Fiori, picche, Cuori, quadri
//Ogni carta, ha un nome, un seme, una potenza e un valore
//Valore: Asso 11, Tre 10, Re 4 , Cavallo 3 , Fante 2 , tutto il resto 0
//Potenza Asso>Tre>Re>Cavallo>Fante>Sette>Sei>Cinque>Quattro>Due
//10>9>8>7....

// const giacomo = [ { name: 'Erik', age: 25 }, 7, 90, 56, 80, 10, 25, 8, 9 ];
// console.log(giacomo.length);
//Utilizzato per gestire liste (elenco di elementi)
//Indentificati dall'indice = dalla posizione
//Il primo elemento ha sempre indice 0
//L'ultimo elemento ha sempre indice array.length-1 (lunghezza dell'array -1)

//Devo generare un mazzo di carte da briscola = devo accoppiare ogni seme ad ogni figura
//mi servono i cicli => perche1 devo scorrere entrambi gli array

const semi = [ 'denari', 'coppe', 'bastoni', 'spade' ];

const figure = [
	{
		name: 'asso',
		valore: 11,
		potenza: 10
	},
	{
		name: 'due',
		valore: 0,
		potenza: 1
	},
	{
		name: 'tre',
		valore: 10,
		potenza: 9
	},
	{
		name: 'quattro',
		valore: 0,
		potenza: 2
	},
	{
		name: 'cinque',
		valore: 0,
		potenza: 3
	},
	{
		name: 'sei',
		valore: 0,
		potenza: 4
	},
	{
		name: 'sette',
		valore: 0,
		potenza: 5
	},
	{
		name: 'fante',
		valore: 2,
		potenza: 6
	},
	{
		name: 'cavallo',
		valore: 3,
		potenza: 7
	},
	{
		name: 're',
		valore: 4,
		potenza: 8
	}
];

const generaMazzo = (figure, semi) => {
	//2 cicli -> posizionati in che modo, con che logica? devo scorrere tutte le figure per ogni seme o viceversa
	//2 cicli annidati, prima scorro i semi e per ogni seme scorro le figure
	const mazzoGenerato = [];
	semi.forEach((seme) => {
		figure.forEach((figura) => {
			// console.log(seme, figura);
			// mazzoGenerato.push({ seme: seme, name: figura.name, valore: figura.valore, potenza: figura.valore });\
			mazzoGenerato.push({ seme: seme, ...figura });
		});
	});
	return mazzoGenerato;
};

const calcolaValoreMazzo = (mazzo) => {
	let sum = 0;
	for (let i = 0; i < mazzo.length; i++) {
		sum += mazzo[i].valore;
	}

	return sum;
};

const calcolaValoreMedioCarte = (mazzo) => {
	let sum = 0;
	for (let i = 0; i < mazzo.length; i++) {
		sum += mazzo[i].valore;
	}
	//in questo punto, io ho la somma di tutti i valori
	return sum / mazzo.length;
};

const trovaCarteConValore = (mazzo) => {
	const carteConValore = [];
	for (let i = 0; i < mazzo.length; i++) {
		if (mazzo[i].valore > 0) carteConValore.push(mazzo[i]);
	}
	//in questo punto, io ho la somma di tutti i valori
	return carteConValore;
};

const mazzo = generaMazzo(figure, semi);
console.log('mazzo', mazzo, mazzo.length);

console.log('Punti totali nel mazzo: ', calcolaValoreMazzo(mazzo));
console.log('Valore medio di ogni carta: ', calcolaValoreMedioCarte(mazzo));
console.log('Numero di carta con valore > 0: ', trovaCarteConValore(mazzo).length);
