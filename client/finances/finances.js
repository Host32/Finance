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

function organizeRecordsToView(records) {
  var groupedRecords = _.groupBy(records.fetch(), function(record) {
    return record.description;
  });

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
  filter.date = {
    $in: getDateFilter()
  };

  return organizeRecordsToView(MoneyRecords.find(filter, {
    sort: {
      description: 1
    }
  }));
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
  fixedExpenses: function(param) {
    return findRecords({
      type: "expense",
      expenseType: "fixed"
    });
  },
  variableExpenses: function(param) {
    return findRecords({
      type: "expense",
      expenseType: "variable"
    });
  },
  extraExpenses: function(param) {
    return findRecords({
      type: "expense",
      expenseType: "extra"
    });
  },
  additionalExpenses: function(param) {
    return findRecords({
      type: "expense",
      expenseType: "additional"
    });
  }
});