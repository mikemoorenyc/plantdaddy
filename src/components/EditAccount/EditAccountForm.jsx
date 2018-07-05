import { h, Component } from 'preact';
import {linkstate} from "linkstate"
import { route } from 'preact-router';
import fetch from "unfetch";
import checkStatus from "../../util/checkStatus.js";

import FormSection from "../common/FormField.jsx";


export default class CreateAccount extends Component {
	constructor(props) {
		super();

		this.state = {
			first_name: '',
			email: '',
			password: '',
			telephone: '',
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
	submitForm(e) {
		e.preventDefault();
		if(this.state.disabled) {
			return false;
		}
		this.setState({status : "sending"});
		let state = this.state;
		state.login_noonce = this.props.uc.state.login_noonce;
		fetch("/endpoints/create-account/",{
			method: "POST",
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify(state),
			credentials: 'include'
		})
		.then( r => r.json() )
  	.then( function(data) {

    	if(!data.success) {
				this.setState({status :null});
				//Update Noonce
				this.setState({
					email: (data.error_code == "bad_email") ? "" : state.email,
					password: '',
					telephone: (data.error_code == "bad_telephone") ? '' : state.telephone
				});
				
				return false;
			}
			this.setState({status: "created"});

  	}.bind(this))


	}



  render(props,state) {

		if(props.create && state.status == "created") {
			return(
				<div>
					Account Created<br/>
					<a native href="/login/">Login Now</a>
				</div>
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
      <form onSubmit={this.submitForm}>
				{sections}
				{password}
				<br/><br/>
				<button disabled={disabled}>{submitText}</button><br/>
				<a href="/login/">Cancel</a>
      </form>
    )
  }

}
