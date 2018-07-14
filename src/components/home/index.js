import { h } from 'preact';
import style from './style.less';
import Layout from "../Layout.jsx";

export default function(props) {
	return (
		<Layout>
		<div>
		Hi, {props.user.state.user.first_name}
		</div>

		</Layout>
	)
}
