import React from 'react';
import VehicleCard from './components/vehicleCard';
import { vehicles } from './const';

export default class App extends React.Component {
	state = {
		vehicles: [],
		name: 'Erik'
	};

	normalizeArray = () => {
		const normalizedVehicles = [];
		vehicles.forEach((vehicle) => {
			if (Array.isArray(vehicle)) normalizedVehicles.push(...vehicle);
			else normalizedVehicles.push(vehicle);
		});
		return normalizedVehicles;
	};

	componentDidMount() {
		const normalized = this.normalizeArray();
		console.log(normalized);
		this.setState({ ...this.state, vehicles: normalized });
	}

	render() {
		// console.log(vehicles);
		return (
			<div className="cards-container">
				{this.state.vehicles.map((vehicle, idx) => <VehicleCard key={idx} vehicle={vehicle} />)}
			</div>
		);
	}
}
