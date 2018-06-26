import { h, Component } from 'preact';



export default class Login extends Component {
  constructor(props) {
    super();
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
