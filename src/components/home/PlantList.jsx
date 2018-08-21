import {h, Component} from "preact";
import {Subscribe} from "unstated";
import fetch from "unfetch";

import PlantContainer from "../../containers/PlantContainer";

export default class PlantList extends Component {
	constructor() {
		super();
		this.state = {
			status: "loading",
			plantOrder:null
		}
	}
	componentWillMount() {
		fetch(
		
	}
	
	render(p,s) {
		if(s.status == "loading") {
			return <div>Loading</div>
		}
		if(s.status === "error" ) {
			return <div>Load Error</div>
		}
		
		if(!s.plants.length) {
		return	<a href="/add-plant/">Add a plant</a>
		}
		
		return <div class="plant-list"><Subscribe to={[PlantContainer]}>
			{function(pc) {
				let
				let plist = s.plants.map(function(e,i) {
					pc.getPlant(e);
					return <div>{pc.state.plants[i].name}</div>
				})
				
				return {plist}
				
			}.bind(this)}
			
			
			
		</Subscribe>
		</div>
		
	}
	
	
}

