import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";
import linkstate from "linkstate";
import Layout from "../Layout.jsx";

import FormField from "../common/FormField.jsx";
import BackArrow from "../common/BackArrow.jsx";

let backArrow = <BackArrow href="/login/" native={false} />
const LayoutSlug = function(p) {
			return (
				<Layout title="Reset Your Password" headerLeft={BackArrow}>{this.props.children}</Layout>
			)

}

export default class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			status: null,
		}
		this.submitForm = this.submitForm.bind(this);

	}
	resetSuccess (data) {
		console.log(data);
		if(!data.success) {
			this.setState({status: "failed"});
			return false;
		}
		this.setState({status: "sent"});
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
		fetch(send_body, "/endpoints/require-reset/", "POST", this.resetSuccess.bind(this));
	}
	componentWillMount() {
		if(this.props.isLoggedIn) {route('/',true);}
	}
	render(props,state) {

		if(state.status == "failed" ) {
		return (
		<LayoutSlug>
				<p>
					There was a problem with your request.
						<br/>
						<a native href="/reset-password">Try Again</a>
				</p>
		</LayoutSlug>
			)
		}

		if(state.status === "sent") {
			return (
				<LayoutSlug>
				<p>
					Your password reset request has been sent. Please check your email for the request.
					<br/>
					<a native href="/login/">Go back to Log In</a>
				</p>
		</LayoutSlug>



			)
		}
		return(
			<LayoutSlug >
				<form onSubmit={this.submitForm.bind(this)}>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Enter Your Email Address"}
					onInput={linkstate(this, 'email')}
					type={"email"}
				/>
				<button type="submit" disabled={(!this.state.email || state.status == "sending")}>Submit</button>
				<br/><br/>
				Enter your email above to reset your password. <a href="/login/">Cancel</a>
			</form>
			</LayoutSlug >


		)



	}



}
