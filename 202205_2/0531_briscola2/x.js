const x = { chiave: 'valore' };
const y = {
	persone: {
		persona1: 10
	}
};
console.log(x.chiave, x.prova, y.persone && y.persone.persona1);

// const z = undefined;+7-

// console.log(z.proprieta)

const arr = [ { chiave: 'valore' }, 2, 3, 4, undefined];
// console.log(arr[0].chiave);
arr.forEach((value) => {
	console.log(value?.chiave);
});
