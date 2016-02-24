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

Template.finances.helpers({
  revenues: function() {
    return organizeRecordsToView(MoneyRecords.find({
      type: "revenue",
      date: {
        $in: getDateFilter()
      }
    }));
  },
  investments: function() {
    return organizeRecordsToView(MoneyRecords.find({
      type: "investment",
      date: {
        $in: getDateFilter()
      }
    }));
  },
  fixedExpenses: function(param) {
    return organizeRecordsToView(MoneyRecords.find({
      type: "expense",
      expenseType: "fixed",
      date: {
        $in: getDateFilter()
      }
    }));
  },
  variableExpenses: function(param) {
    return organizeRecordsToView(MoneyRecords.find({
      type: "expense",
      expenseType: "variable",
      date: {
        $in: getDateFilter()
      }
    }));
  },
  extraExpenses: function(param) {
    return organizeRecordsToView(MoneyRecords.find({
      type: "expense",
      expenseType: "extra",
      date: {
        $in: getDateFilter()
      }
    }));
  },
  additionalExpenses: function(param) {
    return organizeRecordsToView(MoneyRecords.find({
      type: "expense",
      expenseType: "additional",
      date: {
        $in: getDateFilter()
      }
    }));
  }
});