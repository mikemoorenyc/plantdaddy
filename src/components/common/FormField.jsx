import { h} from 'preact';
import {linkstate} from "linkstate";

export default function(p) {
	let type = p.type || "text";
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
