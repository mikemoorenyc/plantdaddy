import {Component, h} from "preact";

import Layout from "../Layout";
import ProfileImg from "../common/ProfileImage";



export default class Account extends Component  {
  constructor(props) {
		super();
		this.state = {
			id : props.id || props.user.state.user.id,
			loaded: false,
			user: null
		}

	}
	componentWillMount() {
		if(this.state.id === this.props.user.state.user.id) {
			this.setState({user:this.props.user.state.user, loaded: true});
			return false;
		}
	}


	render(props,state) {

		let editButton = (props.user.state.user.id == state.id ) ? <a href="/edit-account/">Edit</a> : null;

		return(
				<Layout title={state.user.first_name} headerRight={editButton}>
					<ProfileImg user={state.user} />
					<h1>{state.user.first_name}</h1>

				</Layout>


		);
	}
}
