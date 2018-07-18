import {h} from "preact";
import { Subscribe } from 'unstated';
import UserContainer from "../containers/UserContainer.js";


export default function(p) {
	return(
<Subscribe to={[UserContainer]}>
	{function(user) {
	return(
		<div class="menu">
		<a href="/account/">

		</a>
		<ul>
			<li><a href="/account/">View Your Account</a></li>
			<li><a native href="/logout/">Logout</a></li>
			</ul>

	</div>

		)
}}
</Subscribe>

	)



}
