import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';

export default class App extends Component {
	constructor(props) {
		super();
    this.state = {
     isLoggedIn: props.initInfo.isLoggedIn 
    }
		
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
    if(!this.state.isLoggedIn) {
     route('/login/', true) 
    }
	};

	componentWillMount() {
		if(!this.state.isLoggedIn) {
      route('/login/', true) 
    }
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute.bind(this)}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
