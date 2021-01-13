import css from './tooltip-template.css';
import helper from '../../../js/helper-functions';


function tooltip(data) {
	const template = `
		<div class="tooltip-content">
			<h4>${data.name}</h4>
			<p class="doses">Lorem ipsum</p>
			<p>${data.active_cases}</p>
		</div>
	`;

	return template;
};

export default tooltip;
