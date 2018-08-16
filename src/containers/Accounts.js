import { Container } from 'unstated';
import fetch from "../util/endpointFetch";

export default class UserContainer extends Container {
	state = {
		accounts: {},
		fetchError: null	
	};
	fetchError(statement) {
		this.setState({
			fetchError: statement
		});
		setTimeout(function(){
			this.setState({fetchError:null});
		}.bind(this),5000);
		
	}
	updateAccount(response) {
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
		if(!id || isNaN(id)) {fetchError('Could not find account');return false;}
		
		let currentData = this.state.accounts[id] || {};
		
		fetch(currentData,"/endpoints/accounts/${id}/", "GET" , this.fetchError); 
	}

	
	
	
	
}
