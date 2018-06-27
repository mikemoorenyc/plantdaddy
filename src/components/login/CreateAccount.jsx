import { h, Component } from 'preact';


export default class CreateAccount extends Component {



  render(props,state) {
    return (
      <div>
        Create Account Form
        <button onClick={props.cancelClick}>Cancel</button>
      </div>
    )
  }

}
