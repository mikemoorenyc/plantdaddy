import { h, Component } from 'preact';
import { Subscribe, Provider } from 'unstated'
import { Router, route } from 'preact-router';

import UserContainer from "../containers/UserContainer.js";

import Home from './home';
import Login from './login';
import ForgotPassword from './login/ForgotPassword.jsx';
import EditAccount from "./EditAccount/EditAccountForm.jsx";
import ResetPassword from './login/ResetPassword.jsx';

import {findIndex} from "../util/array_helpers.js";


export default class App extends Component {
  constructor(props) {
    super();
    this.okNoLogPaths = [
			'/login/',
			'/create-account/',
			'/forgot-password/',
			"/reset-password/"
		];
		this.handleRoute = this.handleRoute.bind(this);
  }
  handleRoute() {
    let url = window.location.pathname;

    if(!this.state.isLoggedIn && !findIndex(this.okNoLogPaths, url)) {

     route('/login/', true)
    }
		return false;
  }
  componentWillMount() {
    this.handleRoute();
  }
  render() {
    return (
        <Subscribe to={[UserContainer]}>
          {function(user) {
            return (
            <Router onChange={this.handleRoute.bind(this)}>
              <Home user={user} path="/" />
              <Home path="/index.php" />
              <Login path="/login/" UserContainer={user} />
              <ForgotPassword login_noonce={user.state.login_noonce} path="/forgot-password/" />
            	<ResetPassword login_noonce={user.state.login_noonce} path="/reset-password/" />
            	<EditAccount path="/create-account/"
            		create={true}
            		uc={user}
            	/>
            </Router>
            )
          }.bind(this)}
        </Subscribe>
      );
  }
}
