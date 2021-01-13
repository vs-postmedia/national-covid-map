const helper = {
	getUrlParam(param) {
		const defaultResult = null;
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		let paramValue = urlParams.get(param);

		// is there a value?
		paramValue = paramValue ? paramValue.toUpperCase() : defaultResult;

		// check if the province is a value province code
		if (param === 'prov') {
			paramValue = this.validProvinceCodes.includes(paramValue) ? paramValue : 'BC';
		}
		return paramValue
	},
	map(num, in_min, in_max, out_min, out_max) {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	},
	months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
	numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
	validProvinceCodes: ['YT','NT','NU','BC','AB','SK','MB','ON','QC','NL','NB','PE','NS']
};

export default helper;

