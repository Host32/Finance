Months = [{
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
}];

Months.getCurrent = function() {
  return Months[new Date().getMonth()];
};

Months.getCurrentIndex = function() {
  return new Date().getMonth();
};

Months.get = function(month) {
  return Months[month];
};

Months.iterate = function(callback) {
  var currentMonthIndex = Months.getCurrentIndex() + currentMonthDisplacement.get();
  var NUMBER_OF_MONTHS = numberOfMonths.get();
  var from = 2;
  var to = NUMBER_OF_MONTHS - 3;

  if (NUMBER_OF_MONTHS <= 3) {
    from = 0;
    to = NUMBER_OF_MONTHS - 1;

  } else if (NUMBER_OF_MONTHS <= 5) {
    from = 1;
    to = NUMBER_OF_MONTHS - 2;
  }

  for (var i = -from; i <= to; i++) {
    var index = currentMonthIndex + i;
    var currentYear = Years.getCurrent();

    if (index < 0) {
      index = 12 + index;
      currentYear -= 1;
    }
    if (index > 11) {
      index = index - 12;
      currentYear += 1;
    }

    callback(Months.get(index), currentYear);
  }
};