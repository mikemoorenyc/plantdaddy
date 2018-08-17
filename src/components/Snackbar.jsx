
import { h } from 'preact';


export default function(props) {
	if(props.snackbars.length === 0) {
		return false;
	}
	let snackbars = props.snackbars.sort(function(a,b){
		return a.created - b.created;
	});
	return snackbars.map(function(e,i){
		let classes = "snackbar ${e.kind}";
		return <div class={classes} >{e.text}</div>
	});
	
	
	
	
}
