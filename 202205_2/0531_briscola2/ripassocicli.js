const semi = [ 'denari', 'coppe', 'bastoni', 'spade' ];

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