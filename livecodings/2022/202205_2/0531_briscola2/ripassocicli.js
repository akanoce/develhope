const semi = [ 'denari', 'coppe', 'bastoni', 'spade' ];

// const giacomo = [ { name: 'Erik', age: 25 }, 7, 90, 56, 80, 10, 25, 8, 9 ];
// console.log(giacomo.length);
//Utilizzato per gestire liste (elenco di elementi)
//Indentificati dall'indice = dalla posizione
//Il primo elemento ha sempre indice 0
//L'ultimo elemento ha sempre indice array.length-1 (lunghezza dell'array -1)

//FOR
let semiuniticonfor = '';
for (let i = 0; i < semi.length; i++) {
	// console.log(semi[i]);
	semiuniticonfor += `${semi[i]} `;
}
console.log('con for', semiuniticonfor);
//FOR

//FOREACH
let semiuniticonforeach = '';
const laMiaFunzione = (value, index, array) => (semiuniticonforeach += `${value} `);
semi.forEach(laMiaFunzione);
console.log('con foreach', semiuniticonforeach);
//FOREACH

//WHILE
let semiuniticonwhile = '';
let i = 0;
while (i < semi.length) {
	semiuniticonwhile += `${semi[i]} `;
	i++;
}
console.log('con while', semiuniticonwhile);
//WHILE


