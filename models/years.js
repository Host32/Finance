function getCurrentYear() {
	return new Date().getYear() + 1900;
}

Years = [
	{
		year: getCurrentYear()
	}, {
		year: getCurrentYear() + 1
	}
];

Years.getCurrent = getCurrentYear;