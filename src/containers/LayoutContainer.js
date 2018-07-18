import { Container } from 'unstated';


export default class LayoutContainer extends Container {
  state = {
    menuOpen : false
  }
  toggleMenu(e) {
    e.preventDefault();
    let current = this.state.menuOpen;
    this.setState({menuOpen : (current) ? false : true}) 
  }
}
