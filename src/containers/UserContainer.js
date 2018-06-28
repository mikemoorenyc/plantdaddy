import {Container } from "unstated";

class UserContainer extends Container{
  state = {
    isLoggedIn: INITINFO.isLoggedIn,
		userProfile: INITINFO.userProfile,
		login_noonce: INITINFO.login_noonce
  };
recieveNewStateItem(key, state) {
	let sObj = {};
	sObj['key'] = state;
	this.setState(sObj);
}

  
}
