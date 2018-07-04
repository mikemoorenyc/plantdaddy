import { Container } from 'unstated';

export default class TodoContainer extends Container {
  state = {
    isLoggedIn: INITINFO.isLoggedIn,
    login_noonce: INITINFO.login_noonce
  };

  recieveNewStateItem(key, state) {
	   let sObj = {};
     sObj[key] = state;
     console.log(sObj);
     this.setState(sObj);
 };


}
