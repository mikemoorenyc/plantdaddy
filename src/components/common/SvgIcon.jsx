import {Component, h} from "preact";
import fetch from "unfetch";


export default class SvgIcon extends Component {
	constructor(props) {
		super();
		this.state = {
			svgCode: ''
		}
		
	}
	componentWillMount() {
		if(!this.props.iconName || typeof this.props.iconName !== "string") {
			return false;
		}
		let iconName = this.props.iconName.replace('.svg','');
		fetch(`/assets/icons/${iconName}.svg`)
		.then(function(response) {
			if(response.status > 299) {
				throw {
					success:false,
					status : response.status,
				}
			} else {
				return response.text();
			}
		})
		.then(function(r){
			this.setState({svgCode: r});
			return false;
  	})
		.catch(function(error) {
			return false;
		})
		
	}
	render(props,state) {
		return (
			<span dangerouslySetInnerHTML={{__html: state.svgCode}} />
			
		)
	}
	
	
	
	
}
