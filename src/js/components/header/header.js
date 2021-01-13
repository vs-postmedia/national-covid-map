import helper from '../../helper-functions';
import './header.css';

// import template from 'header-template';
const init = async (data, provCode) => {
	const prov = data.filter(d => d.code === provCode)[0];

	return `
		<h1>${prov.name} has administered <span class="highlight">${helper.numberWithCommas(parseInt(prov.doses_admin))} doses</span> of COVID-19 vaccines so far – roughly <span class="highlight">${prov.pct_admin}%</span> of the supply received from the federal government.</h1>
	`;
}


export default { init };