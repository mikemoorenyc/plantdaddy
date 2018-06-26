import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Login extends Component {
  constructor(props) {
    super();
	  this.state = {
			createAccount: false,
			noonce: props.noonce
		}
  }
	componentWillMount() {
		if(this.props.isLoggedIn) {
			route('/', true);
		}
	}
  componentDidMount() {
    //document.title = "Login to Plantdaddy";
  }



  render() {
    return (
      <div>
        <h1>Log into Plantdaddy</h1>
        <label>Email</label>

        <br/>
        <a href="/login/create-account/" native>Create a new account</a>
      </div>

    )
  }
}
