import { h, Component } from 'preact';
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";
import linkstate from "linkstate";

import FormField from "../common/FormField.jsx";
import Layout from "../Layout.jsx";

import UserContainer from "../../containers/UserContainer";
import {Subscribe} from "unstated";



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

  render(props,state) {		
    let disabled = (state.email && state.password) ? false : true;
    return (
		<Layout title={"Log into PlantDaddy}>
			<Subscribe to={[UserContainer]}>
			{function(user) {
				if(user.isLoggedIn) {
					return <div>You&rsquo;re logged in, {this.state.first_name}</div>
				}
				return <form value="" onSubmit={()=>(linkstate(this, "password"),user.loginUser)}>
				<FormField
					labelShort={"email"}
					value={state.email}
					required={true}
					label={"Email"}
					onInput={linkstate(this, "email")}
					type={"email"}
				/>
				<FormField
					labelShort={"password"}
					value={state.password}
					required={true}
					label={"Password"}
					onInput={linkstate(this, "password")}
					type={"password"}
				/>
				<button disabled={disabled}>Log In</button>
        <br/><br/>
        
			</form>
				
			
			
			
			}.bind(this)}
			
			</Subscribe>
      
			<a href="/create-account/">Create a new account</a><br/>
	    <a href="/forgot-password/">Forget your password?</a>
	</Layout>
    )
  }
}
