import { h, Component } from 'preact';
import {linkstate} from "linkstate";

import fetch from "../../util/endpointFetch.js";

import FormField from "../common/FormField.jsx";
import Layout from "../Layout.jsx";


export default class extends Component {
	constructor(props) {
		super();
		this.state = {
			current_password: '',
			new_password: '',
			new_password_2: '',
			status: "inputing"
		}
		this.submitForm = this.submitForm.bind(this);
	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.current_password || !this.state.new_password || !this.state.new_password_2) {
			//Not filled in
			return false;
		}
		if(this.state.new_password !== this.state.new_password_2) {
			//No match
			return false;
		}
		this.setState({status: "loading"});
		fetch(sendPackage,"/endpoints/accounts/?change_password=1", "POST", this.successHandler );
		
		
	}
	successHandler(data) {
		if(!data.success) {
			//ERROR HANDLING
			return false;
		}
		this.setState({status: "success"});
		
	}
	
	render(props,state) {
		let disabledState = (state.password && state.new_password && state.new_password_2 && state.status == "inputing")  || false;
		let disabledFields = (state.status !== "inputing" || state.status !== "server_error") || false;
		let successMsg = (state.status == "success") ? <div>Password Changed</div> || null;
		let sections = [
			{
				labelShort:"current_password",
				labelLong: "Enter Your Current Password"
			},
			{
				labelShort: "new_password",
				labelLong: "New Password"
			},
			{
				labelShort: "new_password_2",
				labelLong: "New Password Again"
			}
		].map(function(e,i){
			return(
				<FormField
					labelShort={e.labelShort}
					value={state[e.labelShort]}
					required={true}
					label={e.labelLong}
					onInput={linkstate(this, e.labelShort)}
					type={"password"}
					disabled={disabledFields}
				/>			
			)
			
		});
		return(
			<Layout title={"Change your Password"}  >
				<form onSubmit={this.submitForm}>	
						
					{sections}
					<button disabled={disabledState} type="submit">Change Password</button> 
					{successMsg}
				</form>
				
			</Layout>
		
		)
		
	}
	
	
	
	
}
