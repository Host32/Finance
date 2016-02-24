Template.recordPanel.helpers({
  activeClass: function() {
    return Months.getCurrent().name === this.name && Years.getCurrent() === this.year ? 'active' : '';
  },
  getAmount: function(record) {
    var month = this;
    var recordInMonth = _.filter(record.months, function(monthRecord) {
      return monthRecord.date.month === month.name.toLowerCase() && monthRecord.date.year === month.year;
    });

    if (!recordInMonth.length) {
      return moneyFormat(0);
    }

    var amount = _.reduce(recordInMonth, function(memo, record) {
      return memo + record.amount;
    }, 0);

    return moneyFormat(amount);
  },
  months: function() {
    var current = Months.getCurrentIndex();
    var months = [];

    Months.iterate(function(month, year) {
      month.year = year;
      months.push(month);
    });

    return months;
  },
});

Template.recordPanel.onRendered(function() {
  $(window).resize(function() {
    numberOfMonths.set(calcNumberOfMonthsToShow());
  });
});