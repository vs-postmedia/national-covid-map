// CSS
import './css/normalize.css';
import './css/colors.css';
import './css/fonts.css';
import './css/main.css';

// JS
import * as d3 from 'd3';
import head from './js/components/header/header';
import toplineSummary from './js/components/topline-summary/topline-summary';
import tilemap from './js/components/canada-tilemap/canada-tilemap.js';
import provinces from './data/canada-tilemap.json';
import helper from './js/helper-functions';


// import resp from './data/active.json';

// VARS
const variable = 'latest_active_100k';
const legendTitle = 'Active cases per 100,000';
// DATA
const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/covid/covid-national-map.csv';
const toplineSummaryUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/covid/covid-national-summary.csv';


const init = async () => {
	const provCode = helper.getUrlParam('prov');
	const format = helper.getUrlParam('format');
	const topline = helper.getUrlParam('summary');

	// topline summary metrics
	if (topline === 'TRUE') {
		d3.csv(toplineSummaryUrl)
			.then(data => {
				const topline = document.querySelector('#topline-summary');
				topline.innerHTML = buildSummaryBlocks(data[0]);	
			});
	}
	

	// fetch data
	const resp = await d3.csv(dataUrl);

	// group data by province
	const nested = d3.nest()
		.key(d => d.name)
		.entries(resp)
		.map(d => {
			const latest = d.values[d.values.length - 1];
			return {
				name: d.key,
				code: d.values[0].code,
				short_name: d.values[0].short_name,
				active_100k: d.values.map(d => parseFloat(d.active_100k)),
				deaths_100k: d.values.map(d => parseFloat(d.deaths_100k)),
				latest_active_100k: parseFloat(latest.active_100k),
				latest_active: parseFloat(latest.active_cases),
				latest_cases: parseFloat(latest.cumulative_cases),
				latest_deaths: parseFloat(latest.cumulative_deaths),
				date_start: d.values[0].date_active,
				date_end: latest.date_active
			}
		});
	
	const data = await joinData(nested, provinces);

	console.log(data);

	// build header
	const header = document.querySelector('#header');
	header.innerHTML = head.init(data[0]);

	// build map
	tilemap.init('#map', data, nested, variable, legendTitle);

	console.log("eli is not stinky btw")
};

function buildSummaryBlocks(data) {
	let string = '';

	// cases
	string += toplineSummary.metric('Confirmed cases', +data.cumulative_cases, data.cases);

	// deaths
	string += toplineSummary.metric('Deaths', +data.cumulative_deaths, data.deaths);

	// vaccinations
	string += toplineSummary.metric('Vaccines administered', data.cumulative_avaccine, +data.avaccine);

	// timestamp
	string += toplineSummary.timestamp(data.date);
	
	return string;
}

function joinData(data, shapes) {
	// join by prov code
	return shapes.map(s => {
		const dataProps = data.filter(d => d.name === s.name)[0];
		// delete dataProps.prov_code; // duplicate
		
		const joined = Object.assign({}, s, dataProps);

		return joined;
	});
}


init();