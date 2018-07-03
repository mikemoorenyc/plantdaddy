import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "unfetch";
import linkstate from "linkstate";

import {FormField} from "../common/FormField.jsx";

export default class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			status: 'unsent'
		}

	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.email) { return false;}
		let email = this.state.email;
		this.setState({status: "sending"});
		fetch("/endpoints/require-reset/",{
			method: "POST",
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify({email:email})
		})
		.then(function(r){
			if(r.status >= 300) {
				//errorHandlinge
				return false;
			}
			//SEND INFO
			var response = r.json();
			if(response.success) {
				this.setState({status: "sent"});
				return false;
			}
			//ERROR HANDLIGN

		}.bind(this))
	}
	componentWillMount() {
		if(this.props.isLoggedIn) {route('/',true);}
	}
	render(props,state) {

		if(state.status === "sent") {
			return (
				<p>
					Your password reset request has been sent. Please check your email for the request.
					<br/>
					<a href="/login/">Go back to Log In</a>
				</p>


			)
		}
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
				<br/><br/>
				Enter your email above to reseet your password. <a href="/login/">Cancel</a>
			</form>

		)


	}



}
