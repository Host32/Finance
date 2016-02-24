Months = [
	{
		name: "January"
	}, {
		name: "February"
	}, {
		name: "March"
	}, {
		name: "April"
	}, {
		name: "May"
	}, {
		name: "June"
	}, {
		name: "July"
	}, {
		name: "August"
	}, {
		name: "September"
	}, {
		name: "October"
	}, {
		name: "November"
	}, {
		name: "December"
	}
];

Months.getCurrent = function () {
	return Months[new Date().getMonth()];
};

Months.getCurrentIndex = function () {
	return new Date().getMonth();
};

Months.get = function(month) {
	return Months[month];
};