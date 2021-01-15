// https://www.essycode.com/posts/create-sparkline-charts-d3/

import {
	max			as d3_max,
	line        as d3_line,
	range       as d3_range,
	select      as d3_select,
	scaleLinear as d3_scaleLinear
} from 'd3';


const init = (data, el, size, tileHeaderHeight) => {
	// console.log(data)
	const dataCount = data.length;
	const MARGIN = { top: 5, right: 5, bottom: 5 + tileHeaderHeight, left: 5 };
	const INNER_WIDTH  = size - MARGIN.left - MARGIN.right;
	const INNER_HEIGHT = size - MARGIN.top - MARGIN.bottom - tileHeaderHeight * 2;
	const x = d3_scaleLinear().domain([0, dataCount]).range([0, INNER_WIDTH]);
	const y = d3_scaleLinear().domain([0, d3_max(data)]).range([INNER_HEIGHT, 0]);

	const line = d3_line()
		.x((d, i) => x(i))
		.y(d => y(d));

	el.append('path').datum(data)
	  .attr('fill', 'none')
	  .attr('stroke', '#FFF')
	  .attr('stroke-width', 2)
	  .attr('d', line);
	
	el.append('circle')
	  .attr('r', 3)
	  .attr('cx', x(0))
	  .attr('cy', y(data[0]))
	  .attr('fill', '#FFF')
	  .attr('stroke-width', 0);
	
	el.append('circle')
	  .attr('r', 4)
	  .attr('cx', x(dataCount - 1))
	  .attr('cy', y(data[dataCount - 1]))
	  .attr('fill', data[0] < data[dataCount - 1] ? '#E35D42' : 'steelblue')
	  .attr('stroke', '#FFF')
	  .attr('stroke-width', 0.5);
}

export default { init };