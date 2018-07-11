import { h } from 'preact';



export default function(p) {
	let title = p.title || "PlantDaddy" ;
	return (
	<div id="app">
		<div class="header">
			<div class="left-side">
				{p.headerLeft}		
			</div>
			<h1>{title}</h1>
			<div class="right-side">
				{p.headerRight}
			</div>
		</div>
			<div class="content">
				{p.children}
			</div>
	</div>	
		
	
	)

	
	
}
