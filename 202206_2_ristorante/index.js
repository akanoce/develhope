/*
    Per una nota App di food delivery, ci viene richiesto di 
    implementare alcune funzionalità per la gestione del carrello.
*/

//prodotti attualmente presenti nel carrello dell'utente
const productsInCart = [
	{
		id: 324234,
		category: 0,
		quantity: 1,
		title: 'Margherita',
		description: 'Pomodoro, mozzarella e basilico',
		ingredients: [ 'pomodoro', 'mozzarella', 'basilico' ],
		price: 6.5
	},
	{
		id: 098394,
		category: 0,
		quantity: 1,
		title: 'Calzone Classico',
		description: 'Ripieno di Pomodoro, mozzarella e prosciutto cotto',
		ingredients: [ 'pomodoro', 'mozzarella', 'prosciutto cotto' ],
		price: 7.0
	},
	{ id: 432432, category: 4, quantity: 1, title: 'Coca Cola Zero (33CL)', description: '', price: 3.0 },
	{
		id: 564564,
		category: 0,
		quantity: 1,
		title: 'Salamino',
		description: 'Pomodoro, mozzarella e salamino piccante',
		ingredients: [ 'pomodoro', 'mozzarella', 'salamino' ],
		price: 7.5
	},
	{
		id: 564564,
		category: 0,
		quantity: 1,
		title: 'Salamino',
		description: 'Mozzarella, salsiccia, patate al forno',
		ingredients: [ 'mozzarella', 'salsiccia', 'patate al forno' ],
		price: 7.5
	},
	{ id: 333445, category: 4, quantity: 1, title: 'Acqua Naturale (1L)', description: '', price: 2 },
	{
		id: 656765,
		category: 3,
		quantity: 3,
		title: 'Cheesecake Cioccolato',
		description: 'Dolce a base di formaggio fresco e topping al cioccolato',
		price: 5
	}
];

//array statico di oggetti che contiene tutte le categorie presenti nell'app
const categories = [
	{ id: 0, name: 'pizze' },
	{ id: 1, name: 'panini' },
	{ id: 2, name: 'sushi' },
	{ id: 3, name: 'dessert' },
	{ id: 4, name: 'bevande' }
];

//FUNZIONI DA IMPLEMENTARE:

/* 
    ---------------------------------------
    getTotalAmount: restituisce il prezzo finale che l'utente dovrà pagare al checkout
    ---------------------------------------
*/

// const getTotalAmount = () => {
// 	let sum = 0;
// 	// for (let i = 0; i < productsInCart.length; i++) {
// 	//     const product = productsInCart[i]
// 	// 	sum += product.price * product.quantity;
// 	// }
// 	// for (product of productsInCart) {
// 	// 	sum += product.price * product.quantity;
// 	// }
// productsInCart.forEach((product) => (sum += product.price * product.quantity));

// 	return sum;
// };

const getTotalAmount = () => productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0);

console.log(getTotalAmount());

/* 
    ---------------------------------------
    getCategoryCode: prende come parametro il nome di una categoria e ne restituisce l'id
    ---------------------------------------
    */

// const getCategoryCode = (categoryName) => {

//     for (category of categories){
//         if(category.name === categoryName)
//             return category.id
//     }

// }
const getCategoryCode = (categoryName) => categories.find((category) => category.name === categoryName)?.id;

console.log(getCategoryCode('pizze'));

/*
    ---------------------------------------
    getCategoryCount: prende come parametro il nome di una categoria e restituisce il numero di prodotti presenti per questa
    ---------------------------------------
*/

// const getCategoryCount = (categoryName) => {    

//     const categoryCode = getCategoryCode(categoryName)

//     const productsInCategory = []
//     for(product of productsInCart){
//         if(product.category === categoryCode)
//             productsInCategory.push(product)
//     }

//     return productsInCategory.length

// }

const getCategoryCount = (categoryName) => productsInCart.filter(product => product.category === getCategoryCode(categoryName)).length


console.log(getCategoryCount('pizze'));
// console.log(getCategoryCount('bevande'));

/*
    ---------------------------------------
    removeFromCart: prende l'id di un prodotto e ne rimuove una unità dal carrello. Se quantity diventa 0, rimuove il prodotto dall'array
    ---------------------------------------
*/

const removeFromCart = (productId) => {

    const productsInCartCopy = [...productsInCart]

    const productIndex = productsInCartCopy.findIndex(product => product.id === productId)
    if(productIndex === -1)
        throw new Error(`${productId} productIndex do not exist!`)

    const product = productsInCartCopy[productIndex]

    product.quantity-=1
    if(product.quantity <= 0)
    productsInCartCopy.splice(productIndex,1)
    
    return productsInCartCopy.length

}

console.log(removeFromCart(656765), productsInCart.length)




/*
    ---------------------------------------
    printCart: stampa su console tutti i prodotti divisi per categoria. 

    formato richiesto:
        *** PIZZA ***
        - 1 x Margherita (Pomodoro, mozzarella e basilico) | 6.5€
        - 1 x Calzone classico (Ripieno di Pomodoro, mozzarella e prosciutto cotto) | 7€

        *** BEVANDE ***
        - 1 x Coca Cola Zero (33CL) | 3€

        *** TOTALE ***
        16.5€
    ---------------------------------------
*/

// const x = {
//     'pizze': [],
//     'bevande': []
// }


const printCart = () => {

    const productsByCategory = {}
    categories.forEach(category => {
        productsByCategory[category.name] = productsInCart.filter(product => product.category === category.id)
    })
    
    // console.log(productsByCategory)

    Object.keys(productsByCategory).forEach(categoryName => {
        const categoryProducts = productsByCategory[categoryName]
        if(categoryProducts.length){
        console.log(`*** ${categoryName.toUpperCase()} ***`) 
        categoryProducts.forEach(product => console.log(`- ${product.quantity} x ${product.title}${product.description && ` (${product.description})` } | ${product.price}€`))
        console.log("\n")
    }
    })
    console.log(`*** TOTALE ***`)
    console.log(`${getTotalAmount()}€`)

}

console.log(printCart())



/*
    ---------------------------------------
    getPizzeBianche: Restituisce tutte le pizze bianche presenti nel carrello (pizze senza pomodoro)
    ---------------------------------------

*/

const getPizzeBianche = () => productsInCart.filter(product => product.category === 0 && !product.ingredients.includes('pomodoro') )

// console.log(getPizzeBianche())
