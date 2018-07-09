import { h} from 'preact';
import {linkstate} from "linkstate";
import PhotoField from "./PhotoField"

export default function(p) {
	let type = p.type || "text";
	if(type == "photo") {
		return <PhotoField current_img={p.current_img} onChange={p.onChange} />
	}
	return(
		<div class="formRow">
			<label for={p.labelShort}>{p.label}</label><br/>
				<input
					type={type}
					id={p.labelShort}
					onInput={p.onInput}
					required={p.required}
					type={p.type}
					value={p.value}
					name={p.labelShort}
					 />
		</div>




	)




}
