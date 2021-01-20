import helper from '../../helper-functions';
import './topline-summary.css';

const metric = (metric, value, latest, date) => {

	return `
		<div class="container ${metric.toLowerCase().replace(' ', '-')}">
			<h1>${helper.numberWithCommas(value)}</h1>
			<p class="metric-name">${metric}</p>
		</div>
	`;
}

const timestamp = (dateString) => {
	const d = dateString.split('-');
	const month = helper.months[+d[1] - 1];
	return `
		<p class="timestamp">Last update: ${month} ${d[0]}, ${d[2]}</p>
	`;
}


export default { metric, timestamp };


// <p class="metric-latest">${helper.numberWithCommas(latest)}</p>