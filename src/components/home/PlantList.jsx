import {h, Component} from "preact";
import {Subscribe} from "unstated";
import fetch from "unfetch";

import PlantContainer from "../../containers/PlantContainer";

export default class PlantList extends Component {
	constructor() {
		super();
		this.state = {
			status: "loading",
			plantOrder:[]
		}
	}
	componentWillMount() {
	
		
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
				let plants = s.plantOrder.map(function(e,i) {
					if(!pc.state.plants[e]) {
						pc.fetchPlant(e);
						return <div>Blank</div>
					}
					return <div>{pc.state.plants[e].name}</div>
				})
				
				return {plist}
				
			}.bind(this)}
			
			
			
		</Subscribe>
		</div>
		
	}
	
	
}

