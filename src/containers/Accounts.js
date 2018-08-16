import { Container } from 'unstated';
import fetch from "unfetch";
import apiSettings from "../util/apiSettings";

export default class UserContainer extends Container {
	state = {
		accounts: {},
		fetchError: {},
		fetching: {}
	};

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
		fetch("/endpoints/accounts/${id}/",apiSettings(currentData, "GET"))
		.then(function(response){
			fetching[id] = false;
			this.setState({fetching: fetching});
			if(response.status > 299) {
				throw response.status;
			}	else {
					return response.json();
			}
			
		}.bind(this))
		.then(function(d){
			let accounts = this.state.accounts;
			accounts[d.id] = d;
      this.setState({accounts: accounts});
		
		}.bind(this))
		.catch(function(status){
			if(status === 305) {
				return false;
			}
			if(staus > 399) {
				fetchError[id] = "Could not find account";
				this.setState({fetchError : fetchError});
			}
		}.bind(this))
	}

	
	
	
	
}
