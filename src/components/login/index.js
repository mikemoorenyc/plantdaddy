import { h, Component } from 'preact';
import { route } from 'preact-router';

import {FormField} "../common/FormField.jsx";


export default class Login extends Component {
  constructor(props) {
    super();
	  this.state = {
			disabled: true,
			password: '',
			email: ''
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
		//LOGIN
	}
  


  render(props,state) {
    
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
