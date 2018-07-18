import {h} from "preact";
import LayoutContainer from "../../containers/LayoutContainer";
import {Subscribe} from "unstated";

export default function(p)  {
	return (
		<Subscribe to={[LayoutContainer]}>
			{layout => (
				<button onClick={(e) => (e.preventDefault(); p.toggleMenu();)}>
				Menu
				</button>
			)}
			
			
		</Subscribe>
		
		
		)
	
	
}
