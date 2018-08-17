
import { h, Component } from 'preact';
import linkstate from "linkstate"
import { route } from 'preact-router';
import fetch from "unfetch";
import apiSettings from "../util/apiSettings";
import Layout from "../Layout.jsx";

import FormSection from "../common/FormField.jsx";
import BackArrow from "../common/BackArrow.jsx";

export default class EditPlant extends Component {
	
	constructor(props) {
		super();
		let plant = (props.pc.state.plants[props.id]) ? props.pc.state.plants[props.id]: 
			{title: "", watering_frequency:null,photo_url:"",id:null}
		this.state = {
			plant: plant,
			sending: null,
			errors: {}
		}
	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.plant.title || !this.state.plant.watering_frequency) {
			return false;
		}
		if(is_NaN(this.state.plant.watering_frequency)) {
			return false;
		}
		this.setState({sending: true});
		let dataPackage = {
			title: this.state.plant.title,
			watering_frequency: this.state.plant.watering_frequency,
			photo_data: this.state.plant.photo_data || null
		}
		fetch("/endpoints/plants/",apiSettings(dataPackage, "POST"))
		.then(function(response){
			this.setState({sending: false});
			if(response.status < 299) {
				throw {
					status: response.status,
					code: response.headers.get('Error-Code')
				}else {
					return response.json();
				}

			}
		}.bind(this))
		.then(function(data){
			this.props.pc.getPlant(data);
			this.props.createSnackBar({kind: "good", text: "Plant Created!"});
			route('/',true);
		});
	}
	
	
	render(props,state) {
		
		
	}
}
