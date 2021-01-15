import css from './tooltip-template.css';
import helper from '../../../js/helper-functions';


function tooltip(data) {
	const template = `
		<div class="tooltip-content">
			<h4>${data.name}</h4>
			<p>There are currently <span class="blue">${helper.numberWithCommas(data.latest_active)} active cases</span> in ${data.name} – roughly ${data.latest_active_100k} cases per 100,000 people.</p>
			<p>At least <span class="black">${helper.numberWithCommas(data.latest_deaths)} people have died</span> from the virus.</p>
		</div>
	`;

	return template;
};

export default tooltip;
