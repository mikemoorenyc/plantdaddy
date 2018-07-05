import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "unfetch";

import FormField from "../common/FormField.jsx";


export default class Login extends Component {
  constructor(props) {
    super();
	  this.state = {
			disabled: true,
			password: '',
			email: '',
			first_name: null,
		}

  }
	componentWillMount() {

		if(this.props.UserContainer.state.isLoggedIn) {
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
				first_name: response.user.first_name
			});
			this.props.UserContainer.recieveNewStateItem('isLoggedIn',true);
			this.props.UserContainer.recieveNewStateItem('userProfile', response.user);
			setTimeout(function(){
				route("/",true)
			}, 2000);
		}.bind(this))
	}



  render(props,state) {

		if(props.UserContainer.state.isLoggedIn) {
			return(
				<div>You&rsquo;re logged in, {first_name}</div>
			)
		}

    return (
      <form onSubmit={this.submitForm}>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Email"}
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
        <br/><br/>
        <a href="/create-account/">Create a new account</a><br/>
	    <a href="/forgot-password/">Forget your password?</a>
			</form>

    )
  }
}
