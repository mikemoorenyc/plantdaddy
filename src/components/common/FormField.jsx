import { Component, h} from 'preact';
import PhotoField from "./PhotoField"

export default class FormField extends Component {

	constructor(props) {
		super();
		this.cancelClick = this.cancelClick.bind(this);
	}
	cancelClick(e) {
		e.preventDefault();
		this.input.value = '';
		this.props.onInput();
	}

	render(p,s) {
		let type = p.type || "text";

		if(type == "photo") {
			return <PhotoField disabled={p.disabled} current_img={p.value} onChange={p.onInput} />
		}
		return(
			<div class="formRow">
				<label for={p.labelShort}>{p.label}</label><br/>
					<input
						ref={input => this.input = input}
						type={type}
						id={p.labelShort}
						onInput={p.onInput}
						required={p.required}
						type={p.type}
						value={p.value}
						name={p.labelShort}
						disabled={p.disabled}
						 />

						 <button onClick={this.cancelClick}>X</button>
						 <br/><br/>
			</div>





		)
	}






}
