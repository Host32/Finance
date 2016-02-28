function getDateFilter() {
  var dates = [];

  Months.iterate(function(month, year) {
    dates.push({
      month: month.name.toLowerCase(),
      year: year
    });
  });

  return dates;
}

function findRecordsByAtualDate(filter){
  filter.date = {
    $in: getDateFilter()
  };

  return MoneyRecords.find(filter, {
    sort: {
      description: 1
    }
  });
}

function groupRecords(records, groupBy){
  return _.groupBy(records.fetch(), function(record) {
    return record[groupBy];
  });
}

function organizeRecordsToView(groupedRecords, group) {
  var viewRecords = [];
  for (var description in groupedRecords) {
    if (groupedRecords.hasOwnProperty(description)) {
      viewRecords.push({
        description: description,
        months: groupedRecords[description]
      });
    }
  }

  return viewRecords;
}

function findRecords(filter) {
  var records = findRecordsByAtualDate(filter);
  var groupedRecords = groupRecords(records, 'description');

  return organizeRecordsToView(groupedRecords, 'description');
}

function findBalance() {
  var records = findRecordsByAtualDate({});
  var groupedRecords = groupRecords(records, 'type');

  if(!groupedRecords.revenue){
    groupedRecords.revenue = [];
  }
  if(!groupedRecords.investment){
    groupedRecords.investment = [];
  }
  if(!groupedRecords.expense){
    groupedRecords.expense = [];
  }

  var balance = organizeRecordsToView(groupedRecords);

  balance.revenue = {
    months: groupedRecords.revenue
  };
  balance.investment = {
    months: groupedRecords.investment
  };
  balance.expense = {
    months: groupedRecords.expense
  };

  return balance;
}

Template.finances.helpers({
  revenues: function() {
    return findRecords({
      type: "revenue"
    });
  },
  investments: function() {
    return findRecords({
      type: "investment"
    });
  },
  fixedExpenses: function() {
    return findRecords({
      type: "expense",
      expenseType: "fixed"
    });
  },
  variableExpenses: function() {
    return findRecords({
      type: "expense",
      expenseType: "variable"
    });
  },
  extraExpenses: function() {
    return findRecords({
      type: "expense",
      expenseType: "extra"
    });
  },
  additionalExpenses: function() {
    return findRecords({
      type: "expense",
      expenseType: "additional"
    });
  },
  balance: function(){
    return findBalance();
  }
});