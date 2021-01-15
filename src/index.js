// CSS
import './css/normalize.css';
import './css/colors.css';
import './css/fonts.css';
import './css/main.css';

// JS
import * as d3 from 'd3';
import head from './js/components/header/header';
import tilemap from './js/components/canada-tilemap/canada-tilemap.js';
import provinces from './data/canada-tilemap.json';
import helper from './js/helper-functions';


import resp from './data/active.json';

// VARS
const variable = 'latest_active_100k';
const legendTitle = 'Active cases per 100,000';
// DATA
const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/covid/covid-vaccination-counts.csv';


const init = async () => {
	const provCode = helper.getUrlParam('prov');
	const format = helper.getUrlParam('format');

	// const resp = await d3.csv(vaxDataUrl);

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
				active_100k: d.values.map(d => d.active_100k),
				deaths_100k: d.values.map(d => d.deaths_100k),
				latest_active_100k: latest.active_100k,
				latest_active: latest.active_cases,
				latest_cases: latest.cumulative_cases,
				latest_deaths: latest.cumulative_deaths,
				date_start: d.values[0].date_active,
				date_end: latest.date_active
			}
		});
	
	const data = await joinData(nested, provinces);

	console.log(data);

	// build header
	const header = document.querySelector('#header');
	const headerCopy = head.init(data[0]);
	header.innerHTML = headerCopy;

	// build map
	tilemap.init('#map', data, nested, variable, legendTitle);

	console.log("eli is not stinky btw")
};


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