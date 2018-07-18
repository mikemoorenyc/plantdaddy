import { h, Component } from 'preact';
import linkstate from "linkstate"
import { route } from 'preact-router';
import fetch from "../../util/endpointFetch.js";

import Layout from "../Layout.jsx";

import FormSection from "../common/FormField.jsx";
import BackArrow from "../common/BackArrow.jsx";

export default class CreateAccount extends Component {
	constructor(props) {
		super();
		let user = (props.uc.state.user) ? props.uc.state.user : {first_name: "", email:"",telephone:"",photo_url:"",id:null}
		this.state = {
			first_name: user.first_name,
			email: user.email,
			password: "",
			telephone: user.telephone,
			photo_data: user.photo_url,
			id: user.id,
			disabled: true,
			status: null
		}

		this.submitForm = this.submitForm.bind(this);
		this.getPhotoData = this.getPhotoData.bind(this);
	}
	componentWillMount() {
		if(this.props.isLoggedIn && this.props.create) {
			route('/',true);
		}
	}
	getPhotoData(data) {
		this.setState({photo_data: data});
	}

	handleResult(data) {
		console.log(data);
		if(!data.success) {
			//Error Handling
			return false;
		}
		if(!this.props.create) {
			this.props.uc.recieveNewStateItem("user", data.data.user);
			route("/account/");
			return false;
		}
		this.setState({status: "created"});
	}
	submitForm(e) {
		e.preventDefault();


		if(this.state.disabled) {
			return false;
		}
		this.setState({status : "sending"});
		let state = this.state;
		state.login_noonce = this.props.uc.state.login_noonce;
		let method = (this.props.create) ? "POST" : "PUT";
		fetch(state,"/endpoints/accounts/","POST",this.handleResult.bind(this));

	}



  render(props,state) {
		let headerText = (props.create) ? "Create Your Account" : "Edit Your Account";
		let pwOk = (!props.create) ? false : (!this.state.password);
		if(props.create && state.status == "created") {
			return(
				<Layout title={headerText}>
					Account Created<br/>
					<a native href="/login/">Login Now</a>
				</Layout>
			)

		}
		let disabled = (!this.state.first_name || pwOk || !this.state.email || state.status == "sending") ? true : false;
		let submitText = (props.create)? "Create Account" : "Save Changes";
		let password = 	<FormSection
											labelShort={"password"}
											value={state.password}
											required={true}
											label={"Password"}
											onInput={linkstate(this,"password")}
											type={"password"}
											/>
		if(!props.create) {
			password = <div><a href="/change-password/">Change your password</a> </div>
		}
		let sections = [
			{
				labelShort:"photo_data",
				value:state.photo_data,
				required: false,
				type: "photo",
				label : "Photo"
			},
			{
				labelShort:"first_name",
				value:state.first_name,
				required: true,
				label : "First Name"
			},
			{
				labelShort:"email",
				value: state.email,
				required: true,
				type: "email",
				label: "Email Address"
			},
			{
				labelShort: "telephone",
				value: state.telephone,
				required: false,
				type: "tel",
				label: "Telephone Number"
			}

		].map(function(e,i) {
			let change = (e.type === "photo")?this.getPhotoData : linkstate(this,e.labelShort);
			return <FormSection
							key={i}
							type = {e.type}
							 onInput={change}
							 labelShort={e.labelShort}
							 value={e.value}
							 required={e.required}
							 label={e.label} />
		}.bind(this));
    return (
		<Layout title={headerText} headerLeft={<BackArrow native={false} href={"/login/"}/>} >
      <form onSubmit={this.submitForm}>
				{sections}
				{password}
				<br/><br/>
				<button disabled={disabled}>{submitText}</button><br/>
			
      </form>
			</Layout>
    )
  }

}
