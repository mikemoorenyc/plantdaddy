import { Container } from 'unstated';
import fetch from "unfetched";


export default class PlantContainer extends Container {
	state = {
		plants:null,
		loadError: false
	}

	getPlants() {
		async function plantGetter() {
			let plants = await fetch(state,"/endpoints/plants/", "GET" );
			if(!plants.success) {
				this.setState({
					loadError: true
				});
				return false;
			}
			this.setState({
				loadError: false,
				plants: plants.data.plants
			});
			
		}.bind(this);
		plantGetter();
		
	}

	
	
	
	
}
