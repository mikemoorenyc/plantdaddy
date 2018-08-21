import { Container } from 'unstated';
import fetch from "unfetched";

import {removeItem} from "../util/array_helpers";
import apiSettings from "../util/apiSettings";

export default class PlantContainer extends Container {
	state = {
		plants: {},
		fetching: [],
		errored: []
	}

	getPlant(plant) {
		let plants = this.state.plants;
		plants[plant.id] = plant;
		this.setState({plants: plants});		
	}

	fetchPlant(id,force) {
		if((this.state.plants[id] && !force) || this.state.fetching.includes(id)) {
			 return false;
		}
		let fetching = this.state.fetching.slice();
		fetching.push(id);
		this.setState({fetching: fetching});
		this.setState({errored: removeItem(id, this.state.errored)});
		fetch("/endpoints/plants/${id}/",apiSettings({}, "GET"))
		.then(function(response){
			this.setState({fetching : removeItem(id, this.state.fetching)});
			this.setState({fetching: fetching});
			if(response.status > 200) {
				throw response.status;
			}	else {
					return response.json();
			}
			
		}.bind(this))
		.then(function(d){
			this.setState({errored: removeItem(id, this.state.errored)});
			let plants = this.state.plants;
			plants[d.id] = d;
      this.setState({plants: plants});
		
		}.bind(this))
		.catch(function(status){
			if(status === 304 && this.state.plants[id]) {
				return false;
			}
			let errored = this.state.errored.slice();
			errored.push(id);
			this.setState({errored: errored});
		}.bind(this))
	}


	
	
	
	
}
