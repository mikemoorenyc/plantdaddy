import { Container } from 'unstated';
import fetch from "unfetched";


export default class PlantContainer extends Container {
	state = {
		plants: {},
		fetching: null
	}

	getPlant(plant) {
		let plants = this.state.plants;
		plants[plant.id] = plant;
		this.setState({plants: plants});		
	}

	
	
	
	
}
