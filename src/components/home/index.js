import { h } from 'preact';
import style from './style.less';

export default function(props) {
	console.log(props);
	return (
		<div>
		Hi, {props.user.first_name}
		</div>
	)
}
