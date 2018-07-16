import { h, Component } from 'preact';

import { Subscribe, Provider } from 'unstated';

import MainApp from "./app.js";
import UserContainer from "../containers/UserContainer.js";





export default class App extends Component {
	constructor() {
		super();
		
	}
	render() {
		return (

				<Subscribe to={[UserContainer]}>
					{user => (
        <MainApp user={user}/>

      )}
					
				</Subscribe>

  	)
		
	}
  
}
