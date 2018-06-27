import { h, Component } from 'preact';
import { route } from 'preact-router';


import CreateAccount from "./CreateAccount.jsx";

export default class Login extends Component {
  constructor(props) {
    super();
	  this.state = {
			createAccount: props.create,
			noonce: props.noonce
		}
    this.cancelClick = this.cancelClick.bind(this)
  }
	componentWillMount() {
		if(this.props.isLoggedIn) {
			route('/', true);
		}
	}
  componentDidMount() {
    //document.title = "Login to Plantdaddy";
  }
  cancelClick(e) {
    e.preventDefault();
    var newSwitch = e.target.value || false
    this.setState({createAccount: newSwitch});
  }



  render(props,state) {
    if(state.createAccount) {
      return <CreateAccount
        cancelClick={this.cancelClick}
      />;
    }
    return (
      <div>
        <h1>Log into Plantdaddy</h1>
        <label>Email</label>

        <br/>
        <button class="button-link" value={true}  onClick={this.cancelClick}>Create a new account</button>
      </div>

    )
  }
}
