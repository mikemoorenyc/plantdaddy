import { Container } from 'unstated';
import fetch from "unfetched";
import { route } from 'preact-router';

export default class UserContainer extends Container {
  state = {
    isLoggedIn: (INITINFO.isLoggedIn === true) ? true : false,
    login_noonce: INITINFO.login_noonce,
    user: INITINFO.userProfile,
		login_error: {}
  };
	
	loginUser(e) {
		e.preventDefault();
		if(!e.target.elements) {
			return false;
		}
		let password = e.target.elements['password'];
		let email = e.target.elements['email'];
		if(!email || !password) {
			this.setState({login_error:"required_missing"});
			return false;
		}
		let request = {
			email: email,
			password: password,
			login_noonce: this.state.login_noonce
		}
		
		async function resultGetter() {
			let result = await fetch(state,"/endpoints/login-user/", "POST" );
			if(!result.success) {
				this.setState({
					login_error: {
						errored: true,
						reason: result.error_code
					}
				});
				return false;
			}
			this.setState({
				user: result.user,
				isLoggedIn : true
			});
			setTimeout(function(){
				route("/",true)
			}, 2000);
			
		}.bind(this)
		
	}

	

  

}
