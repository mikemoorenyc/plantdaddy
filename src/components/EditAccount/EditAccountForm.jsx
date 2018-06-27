import { h, Component } from 'preact';
import {linkstate} from "linkstate"
import { route } from 'preact-router';
import fetch from "fetch";
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
			noonce: props.noonce,
			disabled: true
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
			if(!this.state.firstname || !this.state.password || !this.state.email) {
				this.setState({disabled: true});
			}
		});
		
	}
	submitForm(e) {
		e.preventDefault();
		if(this.state.disabled) {
			this.generateErrors();
			return false;
		}
		fetch('/bear', {
  		method: 'POST',
  		headers: {
    		'Content-Type': 'application/json'
  		},
  		body: JSON.stringify(this.state)
			.then( checkStatus(r.status) )
  		.then( r => r.json() )
 			.then( data => {
    		console.log(data);
  		});
		
	}
	


  render(props,state) {
		let submitText = (props.create)? "Create Account" : "Save Changes";
		let password = 	<FormSection
											labelShort={"password"}
											value={state.password}
											required={true}
											label={"Password"}
											onChange={this.inputChange}
											/>
		if(!props.new) {
			password = <div><button>Change Password</button> </div>
		}
		let sections = [
			{
				labelShort:"firstname",
				value:state.firstame,
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
			return <FormSection onSubmit={this.submitForm}
							 onChange={this.inputChange} 
							 labelShort={e.labelShort} 
							 value={e.value} 
							 required={e.required} 
							 label={e.label} />
		});
    return (
      <form onSubmit={this.submitForm}>
				{sections}
				{password}
				<button disabled={state.disabled}>{submitText}</button>
      </form>
    )
  }

}
