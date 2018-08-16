import { Container } from 'unstated';
import fetch from "../util/endpointFetch";

export default class UserContainer extends Container {
	state = {
		accounts: {},
		fetchError: {},
		fetching: {}
	};

	updateAccount(response) {
		let fetching = this.state.fetching;
		let fetchError = this.state.fetchError;
		
		this.setState(
		switch(response) {
    case (response.status === 304):
        return null;
        break;
    case (response.status > 399):
        this.fetchError('Could not find account');
				return null
        break;
    default:
				let accounts = this.state.accounts;
				accounts[response.data.id] = response.data;
        this.setState({accounts: accounts});
		}
	}
	getAccount(id) {
		if(!id) {
			return null;
		}
		let fetchError = this.state.fetchError;
		fetchError[id] = null;
		let fetching = this.state.fetching;
		fetching[id] = true;
		this.setState({
			fetching: fetching,
			fetchError: fetchError
		});
		
		let currentData = this.state.accounts[id] || {};
		
		fetch(currentData,"/endpoints/accounts/${id}/", "GET" , this.updateAccount); 
	}

	
	
	
	
}
