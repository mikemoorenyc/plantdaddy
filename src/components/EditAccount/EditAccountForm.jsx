import { h, Component } from 'preact';
import {linkstate} from "linkstate"

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
	


  render(props,state) {
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
			return <FormSection 
							 onChange={this.inputChange} 
							 labelShort={e.labelShort} 
							 value={e.value} 
							 required={e.required} 
							 label={e.label} />
		});
    return (
      <form>
				{sections}
				{password}
        <button onClick={props.cancelClick}>Cancel</button>
      </form>
    )
  }

}
