import {Component, h} from 'preact';


export default class App extends Component {
	constructor(props) {
		super();
		this.state = {
			current_img: props.current_img
		}
	}
	fakeClick(e) {
		e.preventDefault();
		this.uploader.click();
	}
	fileChange(e) {
		let file = e.target.files[0];
  	let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			let data = reader.result;
			this.setState({current_img:data});
			this.props.callback(data);
   	}.bind(this);
	}
	
	
	render(props,state) {
		<input type="file" onChange={this.fileChange.bind(this)} accept="*/image" ref={uploader => this.uploader = uploader}/>
		<img src={state.current_img} onClick={this.fakeClick.bind(this)}/>
	}
	
	
}
