import {h} from "preact";
import {Subscribe} from "unstated";

import PlantContainer from "../../containers/PlantContainer";

export default function PlantList(p) {
	return <Subscribe to={[PlantContainer]}>
			{function(plants){	
				if(!plants.loadError && !plants.plants) {
					plants.getPlants();
					return <p>Loading</p>
				}
				if(plants.loadError) {
					return <p>LoadError</p>
				}
				return <div>Plant List</div>
				
			}.bind(this)}
		</Subscribe>
	
}
