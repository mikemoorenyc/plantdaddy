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
			status: null
		}

	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.email) { return false;}
		let send_body = {
			email: this.state.email,
			login_noonce: this.props.login_noonce
		};
		
		let email = this.state.email;
		this.setState({status: "sending"});
		fetch("/endpoints/require-reset/",{
			method: "POST",
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify(send_body)
		})
		.then( r => r.json() )
		.then(function(d){
			if(!d.status) {
				//error handling
				return false;
			}
			this.setState({status: "sent"});

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
					<a native href="/login/">Go back to Log In</a>
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
				<button type="submit" disabled={(this.state.email || state.status == "sending")}>Submit</button>
				<br/><br/>
				Enter your email above to reset your password. <a native href="/login/">Cancel</a>
			</form>

		)


	}



}
