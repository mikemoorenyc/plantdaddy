import { Container } from 'unstated'
import { h, Component } from 'preact';

export default class UserContainer extends Container{
  constructor() {
    super();
    this.state = {
      isLoggedIn: INITINFO.isLoggedIn,
  		userProfile: INITINFO.userProfile,
  		login_noonce: INITINFO.login_noonce
    }
  }


  /*
recieveNewStateItem(key, state) {
	let sObj = {};
	sObj['key'] = state;
	this.setState(sObj);
};
*/

}
