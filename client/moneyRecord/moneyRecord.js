var isExpense = false;

Template.moneyRecord.helpers({
  months: function() {
    return Months;
  },
  years: function() {
    return Years;
  },
  toLowerCase: function(str) {
    return str.toLowerCase();
  },
  moneyFormat: function(amount){
    return moneyFormat(amount);
  },
  recordsToShow: function(){
    return recordsToShow.get();
  }
});

Template.moneyRecord.events({
  'change select[name=type]': function(event, context) {
    if (event.target.value === 'expense') {
      $('#expense-type-group').removeClass('hide');
    } else {
      $('#expense-type-group').addClass('hide');
    }
  },
  'submit form': function(event, context) {
    event.preventDefault();

    var record = {
      description: $('input[name=description]').val(),
      amount: parseFloat($('input[name=amount]').val()),
      date: {
        month: $('select[name=month]').val(),
        year: parseInt($('select[name=year]').val(), 10)
      },
      type: $('select[name=type]').val()
    };

    if (record.type === 'expense') {
      record.expenseType = $('select[name=expenseType]').val();
    }

    Meteor.call("addRecord", record);
    $('.close').click();
  },
  'click .removeButton': function(){
    var recordId = this._id;

    Meteor.call("removeRecord", recordId);

    var records = _.reject(recordsToShow.get(), function(record){
      return record._id == recordId;
    });

    recordsToShow.set(records);
  }
});