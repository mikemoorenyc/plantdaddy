import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "unfetch";
import linkstate from "linkstate";

import FormField from "../common/FormField.jsx";


export default class ResetPassword extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			status: null,
      reset_token: INITINFO.reset_token,
      errored: false,
      error_type:null,
      email: '',
      password: '',
      password_2: ''
		}


	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.email || (this.state.password !== this.state.password_2)) { return false;}
		let sendPackage = {
      email: this.state.email,
      password: this.state.password
    };
		sendPackage.reset_token = this.state.reset_token;
		this.setState({status: "sending"});
		fetch("/endpoints/reset-password/",{
			method: "POST",
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify(sendPackage)
		})
		.then(function(r){
			if(r.status >= 300) {
				//errorHandlinge
				return false;
			}
			//SEND INFO
			var response = r.json();
			if(response.success) {
				this.setState({status: "reset_success"});
				return false;
			}
			//ERROR HANDLIGN

		}.bind(this))
	}
	componentWillMount() {
		if(this.props.isLoggedIn) {route('/',true);}
	}
	render(props,state) {
    if(this.state.sent && state.status === "reset_success") {
      return (
        <p>
        Your password has been successfully reset. <br/>
        <a  native href="/login/">Login</a>
				</p>
      )
    }

    if(!state.reset_token) {
      return (
        <p>
          We can't verify that you requested a password reset. <br/>
          <a native href="/forgot-password/">Try Again</a>
        </p>
      )
    }




		return(
			<form onSubmit={this.submitForm.bind(this)}>
        <p>Enter the email address associated with your account and a new password.</p>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Email Address"}
					onInput={linkstate(this, 'email')}
					type={"email"}
				/>
        <FormField
					labelShort={"password"}
					value={state.password}
					required={true}
					label={"New Password"}
					onInput={linkstate(this, 'password')}
					type={"password"}
				/>
        <FormField
					labelShort={"password_2"}
					value={state.password_2}
					required={true}
					label={"Confirm Your New Password"}
					onInput={linkstate(this, 'password_2')}
					type={"password"}
				/>

				<button type="submit" disabled={!this.state.email || !this.state.password || !this.state.password_2}>Submit</button>


			</form>

		)


	}



}
