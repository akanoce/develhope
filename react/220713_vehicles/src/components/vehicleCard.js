import React from 'react';

export default class VehicleCard extends React.Component {
	render() {
		const supplyBackgroundColor =
			this.props.vehicle.engine.supply === 'Gasoline'
				? 'gray'
				: this.props.vehicle.engine.supply === 'Electric' ? 'green' : 'blue';
		const supplyTextColor = this.props.vehicle.engine.supply === 'Gasoline' ? 'black' : 'white';
		const hpSpanStyle = {
			color: this.props.vehicle.engine.hp > 220 ? 'white' : 'black',
			backgroundColor: this.props.vehicle.engine.hp > 220 ? 'red' : 'white'
		};
		return (
			<div className="vehicle-card">
				<div className="vehicle-card__header">
					<span>{this.props.vehicle.brand} </span>
					<span>{this.props.vehicle.model} </span>
				</div>
				<div className="vehicle-card__footer">
					<div className="vehicle-card__footer__engine">
						<span style={{ color: supplyTextColor, backgroundColor: supplyBackgroundColor }}>
							{this.props.vehicle.engine.supply}{' '}
						</span>
						<span style={hpSpanStyle}>{this.props.vehicle.engine.hp} </span>
					</div>
					<span>{this.props.vehicle.year} </span>
				</div>
			</div>
		);
	}
}
