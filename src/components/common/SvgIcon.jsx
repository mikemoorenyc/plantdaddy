import {h} from "preact";
import {Subscribe} from "unstated";
import SvgContainer from "../../containers/SvgContainer";


export default function SvgIcon(p) {
	return (
			<Subscribe to={[SvgContainer]}>
				{function(svgContainer) {
					let iconName =  p.iconName.replace('.svg','').toLowerCase()
					svgContainer.getSvg(iconName);
					let code = (svgContainer.state.svgs[iconName])? svgContainer.state.svgs[iconName].code : "";
					return <span dangerouslySetInnerHTML={{__html: code}} />
				
				}}
			</Subscribe>
	)
	
}
