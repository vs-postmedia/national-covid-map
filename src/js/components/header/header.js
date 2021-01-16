import helper from '../../helper-functions';
import './header.css';

const init = (data) => {
	const endDay = data.date_end.split('-')[0];
	const endMonth = helper.months[parseInt(data.date_end.split('-')[1]) - 1];
	const startDay = data.date_start.split('-')[0];
	const startMonth = helper.months[parseInt(data.date_start.split('-')[1]) - 1];
	const startYear = data.date_start.split('-')[2];

	const startDate = startYear === '2020' ? `${startMonth} ${startDay}, 2020` : `${startMonth} ${startDay}`;
	const endDate = startYear === '2020' ? `${endMonth} ${endDay}, 2021` : `${startMonth} ${startDay}`;


	return `
		<h2>Active cases of COVID-19 in Canada from ${startDate} to ${endDate}</h2>
		<p>Red dots show where active cases have risen over the past month. Blue show where active cases have fallen. Provinces are coloured according to the previous days count for the number of active cases per 100,000 people.</p>
	`;
}


export default { init };
