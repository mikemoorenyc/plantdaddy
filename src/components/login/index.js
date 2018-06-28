import { h, Component } from 'preact';
import { route } from 'preact-router';



import EditAccount from "../EditAccount/EditAccountForm.jsx";

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
      return <EditAccount
        cancelClick={this.cancelClick}
	noonce={props.noonce}
	newAccount={true}
      />;
    }
    return (
      <div>
        <h1>Log into Plantdaddy</h1>
        <label>Email</label>

        <br/>
        <a href="/create-account/">Create a new account</a>
      </div>

    )
  }
}
