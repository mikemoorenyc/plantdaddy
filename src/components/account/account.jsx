import {Component, h} from "preact";

import Layout from "../Layout";
import ProfileImg from "../common/ProfileImage";
import fetch from "../../util/endpointFetch.js"


export default class Account extends Component  {
  constructor(props) {
		super();
		this.state = {
			id : props.id || props.user.state.user.id,
			loaded: false,
			user: null,
			isUser: null
		}

	}
	componentWillMount() {
		if(this.state.id === this.props.user.state.user.id) {
			this.setState({user:this.props.user.state.user, loaded: true, isUser: true});
			return false;
		}
		let id = this.state.id;
		async function getUser() {
			let user = await fetch({},"/endpoints/accounts/${id}/", "GET" );
			if(!user.success) {
				//Error Handling
				return false;
			}
			this.setState({
				user: user.user,
				loaded: true
			});
			return null;
		}.bind(this);
		getUser();
	}
	


	render(props,state) {

		let editButton = (state.isUser) ? <a href="/edit-account/">Edit</a> : null;

		return(
				<Layout title={state.user.first_name} headerRight={editButton}>
					<ProfileImg user={state.user} />
					<h1>{state.user.first_name}</h1>

				</Layout>


		);
	}
}
