import {h} from "preact";

export default function(p) {
	
	let interior = (p.user.photo_url)? 
			<img src={p.user.photo_url} alt={p.user.first_name} /> :
			<span>{p.user.first_name.charAt(0)}</span>;
	
	return(
		<a style={{background-color: p.user.color}} href={"/profile/"+p.user.id}>
			{interior}
		</a>
	)
	
}
