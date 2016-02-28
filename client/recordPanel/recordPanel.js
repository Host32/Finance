Template.recordPanel.helpers({
  activeClass: function() {
    return Months.getCurrent().name === this.name && Years.getCurrent() === this.year ? 'active' : '';
  },
  getAmount: function(records) {
    var month = this;
    return moneyFormat(getAmount(month, records));
  },
  capitalize: function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
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
  },
  getBalance: function(balance){
    var month = this;

    console.log(balance);

    var revenues = getAmount(month, balance.revenue);
    var investments = getAmount(month, balance.investment);
    var expenses = getAmount(month, balance.expense);

    var total = revenues - investments - expenses;

    return balanceFormat(total);
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