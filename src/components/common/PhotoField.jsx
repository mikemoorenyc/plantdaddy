import {Component, h} from 'preact';


export default class PhotoField extends Component {
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

		if(e.target.files.length < 1) {
			return false;
		}
		let file = e.target.files[0];
  	let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			let data = reader.result;
			this.setState({current_img:data});
			this.props.onChange(data);
   	}.bind(this);
	}


	render(props,state) {
		let img = (state.current_img) ? <img style={{width:100, height:100}} src={state.current_img} /> : null;
		
		return(
			<div class="photoField">
				<input type="hidden" value={state.current_img} onChange={props.onChange} />
				<input 
					disabled={props.disabled} 
					style={{display:"none"}} 
					type="file" 
					onChange={this.fileChange.bind(this)} 
					accept="*/image" ref={uploader => this.uploader = uploader} />
				<div 
					onClick={this.fakeClick.bind(this)} 
					class="click-state" 
					style={{background: "red",width:100, height:100}}>
						{img}
				</div>
			</div>
		)
	}


}
