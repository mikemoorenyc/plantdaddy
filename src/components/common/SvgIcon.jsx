import {Component, h} from "preact";
import fetch from "unfetch";
import {Subscribe} from "unstated";
import SvgContainer from "../../containers/SvgContainer";



class SvgIconInner extends Component {
	constructor(props) {
		super();
		this.state = {
			svgCode: '',
			iconName : props.iconName.replace('.svg','').toLowerCase()
		}
		
	}
	componentWillMount() {
		if(this.props.svgContainer.state.svgs[this.state.iconName]) {
			return false;
		}
		this.props.svgContainer.getSvg(this.state.iconName);
		
	}
	render(props,state) {
		let icon = props.svgContainer.state.svgs[this.state.iconName];
		let code = (icon) ? icon.code || '';
		return (
			<span dangerouslySetInnerHTML={{__html: code}} />
			
		)
	}
		
}
export default function SvgIcon(p) {
	return (
			<Subscribe to={[SvgContainer]}>
				{(user) => (
					<SvgIconInner iconName={p.iconName} svgContainer={user} />
				)}
			</Subscribe>
	)
	
}
