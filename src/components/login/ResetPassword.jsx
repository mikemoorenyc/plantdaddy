import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";
import linkstate from "linkstate";

import FormField from "../common/FormField.jsx";

//60582442e173c27e1a7f
export default class ResetPassword extends Component {
	constructor(props) {
		super();
		this.state = {
			login_noonce: props.login_noonce,
			email: '',
			status: null,
      reset_token: INITINFO.reset_token,
      errored: false,
      error_type:null,
      email: '',
      password: '',
      password_2: ''
		}

		this.successHandler = this.successHandler.bind(this);
	}
	successHandler(data) {
		console.log(data);
			if(!data) {
				//error_handling
				return null;
			}
	}

	submitForm(e) {
		e.preventDefault();
		if(!this.state.email || (this.state.password !== this.state.password_2)) { return false;}
		let sendPackage = this.state;
		this.setState({
			status: "sending",
			password: '',
			password_2: ''
		});
		fetch(sendPackage,"/endpoints/reset-password/", this.successHandler );
	}

	componentWillMount() {
		console.log(this.state.reset_token);
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
				<br/><br/>
				<a native href="/login/">Go to Login Page</a>


			</form>

		)


	}



}
