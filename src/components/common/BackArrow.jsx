import {h} from "preact";


export default function(p) {
	if(p.custom) {
		return(
    	<a href={p.href} native={p.native}>Back</a>
  	)
	}
	return(
		<button onClick={()=>(window.history.back())}>Back</button>
	
	)
  

}
