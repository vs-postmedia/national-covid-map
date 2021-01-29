import css from './tooltip-template.css';
import helper from '../../../js/helper-functions';


function tooltip(data) {
	let death_graf;

	if (data.latest_deaths > 0) {
		death_graf = `<p>At least <span class="black">${helper.numberWithCommas(data.latest_deaths)} people have died</span> in ${data.name} from the virus.</p>`
	} else {
		death_graf = `<p>There haven’t been any deaths reported from the virus</span> in ${data.name}.</p>`
	}

	const template = `
		<div class="tooltip-content">
			<h4>${data.name}</h4>
			<p>There are currently <span class="blue">${helper.numberWithCommas(data.latest_active)} active cases</span> in ${data.name} – roughly ${data.latest_active_100k} cases per 100,000 people.</p>
			${death_graf}
		</div>
	`;

	return template;
};

export default tooltip;
