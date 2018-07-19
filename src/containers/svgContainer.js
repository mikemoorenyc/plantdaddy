import {Container} from "unstated";
import fetch from "unfetch";

export default class SvgContainer extends Container {
	state = {
		svgs: {}
	}
	
	getSvg(name) {
		let iconName = name.replace('.svg','').toLowerCase();
		if(this.state.svgs['iconName'].code) {
			return false;
		}
		fetch(`/assets/icons/${iconName}.svg`)
		.then(function(response) {
			if(response.status > 299) {
				throw {
					success:false,
					status : response.status,
				}
			} else {
				return response.text();
			}
		})
		.then(function(r){
			let svgs = this.state.svgs;
			svgs["iconName"] = {
				code: r		
			}
			this.setState({svgs: svgs});
			return false;
  	}.bind(this))
		.catch(function(error) {
			return false;
		})
		
		
	}
	
	
}
