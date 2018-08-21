import { h } from 'preact';
import style from './style.less';
import Layout from "../Layout.jsx";
import {Subscribe} from "unstated";

import LayoutContainer from "../../containers/LayoutContainer";
import UserContainer from "../../containers/UserContainer";
import PlantContainer from "../../containers/PlantContainer";
import AccountContainer from "../../containers/Accounts";

import ProfileImage from "../common/ProfileImage";
import PlanList from "./PlantList.jsx";

export default function(props) {
  return(
		<Subscribe to={[LayoutContainer,UserContainer,PlantContainer,AccountConainer]}>
			{function(layout,user,plant,account) {
				return(
					<Layout headerLeft={<button onClick={layout.toggleMenu}><ProfileImage user={user.state.user} /></button>}>
						<PlantList pc={plant} ac={account} />
					</Layout>
				)
			}}
  	</Subscribe>
	)
}
