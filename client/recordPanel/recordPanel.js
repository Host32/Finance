Template.recordPanel.helpers({
  activeClass: function() {
    return Months.getCurrent().name === this.name && Years.getCurrent() === this.year ? 'active' : '';
  },
  getAmount: function(record) {
    var month = this;
    var recordsInMonth = _.filter(record.months, function(monthRecord) {
      return monthRecord.date.month === month.name.toLowerCase() && monthRecord.date.year === month.year;
    });

    if (!recordsInMonth.length) {
      return moneyFormat(0);
    }

    var amount = _.reduce(recordsInMonth, function(memo, record) {
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
  stringify: function(obj){
    return JSON.stringify(obj);
  }
});

Template.recordPanel.events({
  "click .editButton": function (event, context){
    var month = this;
    var recordDescription = $(event.currentTarget).data('description');

    var record = _.findWhere(context.data.records, {
      description: recordDescription
    });

    var recordsInMonth = _.filter(record.months, function(monthRecord) {
      return monthRecord.date.month === month.name.toLowerCase() && monthRecord.date.year === month.year;
    });

    recordsToShow.set(recordsInMonth);

    $('#show-records-modal').modal();
  }
});

Template.recordPanel.onRendered(function() {
  $(window).resize(function() {
    numberOfMonths.set(calcNumberOfMonthsToShow());
  });
});