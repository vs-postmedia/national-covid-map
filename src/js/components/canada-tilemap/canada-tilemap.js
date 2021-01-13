import * as d3 from 'd3';
import Popup from '@flourish/popup';
import TooltipTemplate from '../TooltipTemplate/tooltip-template';

// CSS
import './canada-tilemap.css';

const coloursArray = ['#D4DAEA','#AFBEDB','#829DC7', '#6D8EBF','#3C76B0','#0062A3'];

let popup = Popup();
const mobileBreakpoint = 500;
const marginMobile = {top: 50, right: 30, bottom: 25, left: 25};
const marginWeb = {top: 50, right: 50, bottom: 50, left: 50};
let windowWidth, shapeMultiplier, x, y, displayVariable;


const init = async(el, data, metric, legendTitle) => {
	displayVariable = metric;
	const label = 'abbr'; // OR 'code'
	const square = d3.symbol().type(d3.symbolSquare);

	// calculations to jankily adjust map dimensions
	windowWidth = document.querySelector(el).offsetWidth;
	shapeMultiplier = windowWidth < mobileBreakpoint ? 5 : 10;
	const margin = windowWidth < mobileBreakpoint ? marginMobile : marginWeb;
	const height = windowWidth * 0.4;
	const width = windowWidth * 0.8;


	// scales
	x = d3.scaleLinear()
		.range([0, width]);
	y = d3.scaleLinear()
		.range([height, 0]);
		// Compute the scales’ domains.
    x.domain(d3.extent(data, d => d.x)).nice();
    y.domain(d3.extent(data, d => d.y)).nice();


	// SVG
	const svg = d3.select('#map').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom + 10)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  	// add shapes
  	drawShapes(svg, data, square);

    // add labels
    addLabels(svg, data, label);

    // add colours & a legend
    const scaleMax = d3.max(data, d => d[displayVariable]);
    const colours = assignColours(scaleMax);
	addLegend(map, colours, legendTitle, `${Math.floor(scaleMax)}+`, displayVariable);

    // set fill colour for shapes
    data.forEach(function(d) {
        d3.select(`#${d.code}`)
        	.style('fill', colours(d[displayVariable]));
    });
}

function addLabels(svg, data, label) {
	svg.append('g')
		.attr('class', 'labels')
		.selectAll('labels')
		.data(data)
		.enter().append('text')
			.attr('transform', d => `translate(${x(d.x)},${y(d.y)})`)
			.text(d => d[label])
			.attr('class', 'label')
}

function addLegend(svg, legendScale, legendTitle, scaleMax, displayVariable) {
	const legend = d3.select('#map')
		.append('div')
		.attr('class', 'legend');
	
	legend.append('p')
			.attr('class', 'legend-title')
			.text(legendTitle);

	legend.append('div')
		.attr('class', 'legend-fill');

	legend.append('p')
			.attr('class', 'legend-value legend-value-left')
			.text('0');

	legend.append('p')
			.attr('class', 'legend-value legend-value-right')
			.text(scaleMax);
}

function assignColours(scaleMax) {
	// colour scale (postmedia blue)
	return d3.scaleQuantile()
		.domain([0, scaleMax])
		.range(coloursArray);
}

function drawShapes(svg, data, square) {
	// Add the points/shapes
	svg.append('g')
		.attr('class', 'shapes')
		.selectAll('prov')
	    .data(data)
	    .enter().append('path')
	    	.attr('id', d => d.code)
	    	.attr('class', 'prov')
	    	.attr('d', square.size(windowWidth * shapeMultiplier))
	    	.attr('transform', d => `translate(${x(d.x)},${y(d.y)})`)
	    	.on('mouseover', handleMouseenter)
	    	.on('mouseout', handleMouseout)
}

function handleMouseenter(d) {
	popup
		.point(event.pageX, event.pageY)
		.html(TooltipTemplate(d, displayVariable))
		.draw();
}

function handleMouseout(d) {
	popup.hide();
}


export default { init };



