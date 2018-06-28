import { h, Component } from 'preact';
import {linkstate} from "linkstate"
import { route } from 'preact-router';
import fetch from "unfetch";
import checkStatus from "../../util/checkStatus.js";

import FormSection from "./FormSection.jsx";


export default class CreateAccount extends Component {
	constructor(props) {
		super();

		this.state = {
			firstname: '',
			email: '',
			password: '',
			telephone: '',
			login_noonce: props.noonce,
			disabled: true,
			updated: false,
			sending: false,
			created: false
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
			let disabled = (!this.state.firstname || !this.state.password || !this.state.email) ? true : false;
			this.setState({disabled: disabled});
		});

	}
	submitForm(e) {
		console.log(e);
		this.setState{sending:true});
		e.preventDefault();
		let state = this.state;
		fetch("/endpoints/create-account/",{
			method: "POST",
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify(state)
		})
		.then(function(r){
			if(r.status >= 300) {
				//errorHandlinge
				return false;
			}
			//SEND INFO
			var response = r.json();
			this.props.UserContainer.recieveNewStateItem("login_noonce", response.new_login_noonce);
			this.setState({created: true});
			
		}.bind(this))



	}



  render(props,state) {
		if(props.create && state.created) {
			return(
				<div>
					Account Created<br/>
					<a href="/login/">Login Now</a>	
				</div>
			)
			
		}
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
				labelShort:"firstname",
				value:state.firstname,
				required: true,
				label : "First Name"
			},
			{
				labelShort:"email",
				value: state.email,
				required: true,
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
				<button disabled={state.disabled}>{submitText}</button><br/>
				<a href="/login/">Cancel</a>
      </form>
    )
  }

}
