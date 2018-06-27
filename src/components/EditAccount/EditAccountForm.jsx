import { h, Component } from 'preact';
import {linkstate} from "linkstate"


export default class CreateAccount extends Component {
	constructor(props) {
		super();
		this.state = {
			firstname: '',
			email: '',
			noonce: props.noonce
		
	}


  render(props,state) {
    return (
      <form>
				Create Account Form
				<label for="firstname">First Name</label><br/>
				<input required type="text" value={state.firstname} name="firstname" onChange={linkstate(this,"firstname")} />
        <br/><br/>
				<label for="email">Email Address</label>
				<input required type="email" value={state.email} onChange={linkstate(this,"email")} />
        <button onClick={props.cancelClick}>Cancel</button>
      </form>
    )
  }

}
