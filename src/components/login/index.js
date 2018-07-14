import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";
import Layout from "../Layout.jsx";

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
		this.responseHandler = this.responseHandler.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

	componentWillMount() {
    //console.log(this.props.login_noonce);
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
	responseHandler(r) {
    console.log(r);
		if(!r.success) {
			//ERROR HANDLINE
		}
		this.setState({
				loggedIn: true,
				first_name: r.data.user.first_name
		});
		this.props.UserContainer.recieveNewStateItem('isLoggedIn',true);
    this.props.switchLogin(true);
		this.props.UserContainer.recieveNewStateItem('user', r.data.user);
		setTimeout(function(){
			route("/",true)
		}, 2000);
	}
	submitForm(e) {
		e.preventDefault();
		if(!this.state.password || !this.state.email) {return false;}
		let state = this.state;
    state.login_noonce = this.props.login_noonce;

		fetch(state,"/endpoints/login-user/", "POST" ,this.responseHandler);
	}



  render(props,state) {
		let title = "Log into PlantDaddy";
		if(props.UserContainer.state.isLoggedIn) {
			return(
				<Layout title={title}><div>You&rsquo;re logged in, {this.state.first_name}</div></Layout>
			)
		}

    return (
		<Layout title={title}>
      <form onSubmit={this.submitForm.bind(this)}>
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
	</Layout>
    )
  }
}
