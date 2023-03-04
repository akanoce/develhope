import React from 'react';

const baseEndpoint = 'https://api.binance.com';
const exchangeInfoEnpoint = baseEndpoint + '/api/v3/exchangeInfo';
const priceTicker = baseEndpoint + '/api/v3/ticker/price ';

export default class App extends React.Component {
	state = {
		markets: [],
        tickers: [],
		marketsDataLoading: true
	};

	//Come chiamare exchangeInfoEnpoint al mount
	// e come settare markets in modo che contenga tutti i symbols dentro la risposta

	async componentDidMount() {
		console.log('Componente montato');
		const res = await fetch(exchangeInfoEnpoint, { method: 'GET' });
		const json = await res.json();
		console.log(json);
		const tickerRes = await fetch(priceTicker, { method: 'GET' });
		const tickerJson = await tickerRes.json();
		this.setState({ ...this.state, markets: json.symbols.slice(0, 20), tickers: tickerJson, marketsDataLoading: false });
	}

	render() {
		return (
			<div>
                {!this.state.marketsDataLoading ? 
				this.state.markets.map((item, idx) => {
                    const itemTicker = this.state.tickers.find(ticker => ticker.symbol ===  item.symbol)
					return <MarketCard symbol={item.symbol} baseAsset={item.baseAsset} quoteAsset={item.quoteAsset} price={itemTicker?.price} />
				})
                    : <h1>Loading...</h1>
            }
			</div>
		);
	}
}

export class MarketCard extends React.Component {
	render() {
		return (
			<div>
				<h1>
					{this.props.symbol} - {this.props.baseAsset} - {this.props.quoteAsset} - {this.props.price}
				</h1>
			</div>
		);
	}
}
