import { h, Component } from 'preact';
import {linkstate} from "linkstate"
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";
import checkStatus from "../../util/checkStatus.js";
import Layout from "../Layout.jsx";

import FormSection from "../common/FormField.jsx";
import BackArrow from "../common/BackArrow.jsx";

export default class CreateAccount extends Component {
	constructor(props) {
		super();

		this.state = {
			first_name: '',
			email: '',
			password: '',
			telephone: '',
			photo_data: null,
			disabled: true,
			status: null
		}

		this.inputChange = this.inputChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	componentWillMount() {
		if(this.props.isLoggedIn && this.props.create) {
			route('/',true);
		}
	}
	inputChange(e) {
		let stateObj = {};
		stateObj[e.target.id] = e.target.value;

		this.setState(stateObj,function(){
			let disabled = (!this.state.first_name || !this.state.password || !this.state.email) ? true : false;
			this.setState({disabled: disabled});
		});

	}
	handleResult(data) {
		console.log(data);
		if(!data.success) {
			//Error Handling
			return false;
		}
		this.setState({status: "created"});
	}
	submitForm(e) {
		e.preventDefault();
		if(this.state.disabled) {
			return false;
		}
		this.setState({status : "sending"});
		let state = this.state;
		state.login_noonce = this.props.uc.state.login_noonce;
		fetch(state,"/endpoints/accounts/","POST",this.handleResult.bind(this));

	}



  render(props,state) {
		let headerText = (props.create) ? "Create Your Account" : "Edit Your Account"
		if(props.create && state.status == "created") {
			return(
				<Layout title={headerText}>
					Account Created<br/>
					<a native href="/login/">Login Now</a>
				</Layout>
			)

		}
		let disabled = (state.disabled || state.status == "sending") ? true : false;
		let submitText = (props.create)? "Create Account" : "Save Changes";
		let password = 	<FormSection
											labelShort={"password"}
											value={state.password}
											required={true}
											label={"Password"}
											onInput={this.inputChange}
											type={"password"}
											/>
		if(!props.create) {
			password = <div><button>Change Password</button> </div>
		}
		let sections = [
			{
				labelShort:"photo_data",
				value:state.photo_data,
				required: false,
				type: "photo",
				label : "Photo"
			},
			{
				labelShort:"first_name",
				value:state.first_name,
				required: true,
				label : "First Name"
			},
			{
				labelShort:"email",
				value: state.email,
				required: true,
				type: "email",
				label: "Email Address"
			},
			{
				labelShort: "telephone",
				value: state.telephone,
				required: false,
				label: "Telephone Number"
			}

		].map(function(e,i) {
			return <FormSection
							key={i}
							 onInput={this.inputChange}
							 labelShort={e.labelShort}
							 value={e.value}
							 required={e.required}
							 label={e.label} />
		}.bind(this));
    return (
		<Layout title={headerText} headerLeft={<BackArrow native={false} href={"/login/"}/>} />
      <form onSubmit={this.submitForm}>
				{sections}
				{password}
				<br/><br/>
				<button disabled={disabled}>{submitText}</button><br/>
				<a href="/login/">Cancel</a>
      </form>
			</Layout>
    )
  }

}
