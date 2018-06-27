import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import {findIndex} from "../util/array_helpers.js";

import Header from './header';
import Home from './home';
import Profile from './profile';
import Login from './login';

export default class App extends Component {
	constructor(props) {
		super();
    this.state = {
     isLoggedIn: props.initInfo.isLoggedIn
    }
		
		this.okNoLogPaths = [
			'/login/',
			'/create-account/'
		];
		this.handleRoute = this.handleRoute.bind(this);

	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute() {
		let url = window.location.pathname;
    if(!this.state.isLoggedIn && !findIndex(this.okNoLogPaths, url)) {
     route('/login/', true)
    }

	};

	componentWillMount() {
		this.handleRoute();
	}

	render(props,state) {
		return (
			<div id="app">

				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Home path="/index.php" />
					<Login path="/login/" isLoggedIn={state.isLoggedIn} noonce={props.initInfo.loginNoonce} />
					<Login path="/login/create-account/" create={true} isLoggedIn={state.isLoggedIn} noonce={props.initInfo.loginNoonce} />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
