import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "unfetch";

import {FormField} "../common/FormField.jsx";


export default class Login extends Component {
  constructor(props) {
    super();
	  this.state = {
			disabled: true,
			password: '',
			email: '',
			loggedIn: false,
			firstname: null
		}

  }
	componentWillMount() {
		if(this.props.isLoggedIn) {
			route('/', true);
		}
	}
  inputChange(e) {
		let stateObj = {};
		stateObj[e.target.id] = e.target.value;
		this.setState(stateObj,function(){
			let disabled = (!this.state.password || !this.state.email) ? true : false;
			this.setState({disabled: disabled});
		});
	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.password || !this.state.email) {return false;}
		let state = this.state;
		fetch("/endpoints/login-user/",{
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
			let response = r.json();
			this.setState({
				loggedIn: true,
				firstname: response.user.firstname
			});
			this.props.UserContainer.recieveNewStateItem('isLoggedIn',true);
			this.props.UserContainer.recieveNewStateItem('userProfile' response.user);
			setTimeout(function(){
				route("/",true)
			}), 2000);
		}.bind(this))
	}
  


  render(props,state) {
		
		if(state.loggedIn) {
			return(
				<div>You&rsquo;re logged in, {firstname}</div>
			)
		}
    
    return (
      <form onSubmit={this.submitForm}>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Password"}
					onInput={this.inputChange}
					type={"email"}			
				/>
				<FormField
					labelShort={"password"}
					value={state.password}
					required={true}
					label={"Password"}
					onInput={this.inputChange}
					type={"password"}			
				/>
				<button disabled={state.disabled}>Log In</button>
			</form>

    )
  }
}
