import { h} from 'preact';
import {linkstate} from "linkstate";

export default function(p) {
	return(
		<div class="formRow">
			<label for={p.labelShort}>{p.label}</label><br/>
				<input required type={p.type} value={p.value} name={p.labelShort} onChange={linkstate(this,p.labelShort)} />
		</div>
		
		
		
		
	)
		
	
	
	
}
