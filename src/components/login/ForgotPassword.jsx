import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "unfetch";
import linkstate from "linkstate";

import {FormField} "../common/FormField.jsx";

export default class ForgotPassword extend Component {
	constructor() {
		this.state = {
			email: '',
			sent: false
		}
		
	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.email) { return false;}
		
	}
	componentWillMount() {
		if(this.props.isLoggedIn) {route('/',true);}			
	}
	render(props,state) {
		return(
			<form onSubmit={this.submitForm.bind(this)}>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Enter Your Email Address"}
					onInput={linkState(this, 'email')}
					type={"email"} 
				/>
				<button type="submit" disabled={this.state.email}>Submit</button> 
				
			</form>
		
		)
		
		
	}
	
	
	
}
