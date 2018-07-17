import { Container } from 'unstated';

export default class UserContainer extends Container {
  state = {
    isLoggedIn: (INITINFO.isLoggedIn === true) ? true : false,
    login_noonce: INITINFO.login_noonce,
    user: INITINFO.userProfile
  };

  recieveNewStateItem(key, state) {
	   let sObj = {};
     sObj[key] = state;
     this.setState(sObj);
 };


}
