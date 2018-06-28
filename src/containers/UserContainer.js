import {Container } from "unstated";

class UserContainer extends Container{
  state = {
    isLoggedIn: 
  };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}
