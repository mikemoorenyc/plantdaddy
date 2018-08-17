
import { h, Component } from 'preact';
import linkstate from "linkstate"
import { route } from 'preact-router';
import fetch from "unfetch";
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
			loading: null,
			errors: {}
		}
	}
	submitForm(e) {
		e.preventDefault();
		
	}
	
	
	render(props,state) {
		
		
	}
}
