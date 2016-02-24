var BEFORE_MONTHS_QTDE = 2;
var AFTER_MONTHS_QTDE = 3;

function iterateUsableMonths(callback) {
    var currentMonthIndex = Months.getCurrentIndex();
    for(var i = -BEFORE_MONTHS_QTDE; i <= AFTER_MONTHS_QTDE; i++){
        var index = currentMonthIndex + i;
        var currentYear = Years.getCurrent();

        if(index < 0){
            index =  12 + index;
            currentYear -= 1;
        }
        if(index > 11){
            index = index - 12;
            currentYear += 1;
        }

        callback(Months.get(index), currentYear);
    }
}

function moneyFormat(amount){
    return 'R$ ' + (amount.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.'));
}

function getDateFilter(){
    var dates = [];

    iterateUsableMonths(function(month, year) {
        dates.push({
            month: month.name.toLowerCase(),
            year: year
        });
    });

    return dates;
}

function organizeRecordsToView(records){
    var groupedRecords = _.groupBy(records.fetch(), function(record){
        return record.description;
    });

    var viewRecords = [];
    for(var description in groupedRecords){
        if(groupedRecords.hasOwnProperty(description)){
            viewRecords.push({
                description: description,
                months: groupedRecords[description]
            });
        }
    }

    return viewRecords;
}

Template.finances.helpers({
    activeClass: function () {
        return Months.getCurrent().name === this.name ? 'active' : '';
    },
    getAmount: function (record) {
        var month = this;
        var recordInMonth = _.filter(record.months, function(monthRecord){
            return monthRecord.date.month === month.name.toLowerCase() && monthRecord.date.year === month.year;
        });

        if(!recordInMonth.length){
            return moneyFormat(0);
        }

        var amount = _.reduce(recordInMonth, function(memo, record){
            return memo + record.amount;
        }, 0);

        return moneyFormat(amount);
    },
    months: function () {
        var current = Months.getCurrentIndex();
        var months = [];

        iterateUsableMonths(function(month, year) {
            month.year = year;
            months.push(month);
        });

        return months;
    },
    revenues: function () {
        return organizeRecordsToView(MoneyRecords.find({type: "revenue", date: {$in: getDateFilter()}}));
    },
    investments: function () {
        return organizeRecordsToView(MoneyRecords.find({type: "investment", date: {$in: getDateFilter()}}));
    },
    fixedExpenses: function (param) {
        return organizeRecordsToView(MoneyRecords.find({type: "expense", expenseType: "fixed", date: {$in: getDateFilter()}}));
    },
    variableExpenses: function (param) {
        return organizeRecordsToView(MoneyRecords.find({type: "expense", expenseType: "variable", date: {$in: getDateFilter()}}));
    },
    extraExpenses: function (param) {
        return organizeRecordsToView(MoneyRecords.find({type: "expense", expenseType: "extra", date: {$in: getDateFilter()}}));
    },
    additionalExpenses: function (param) {
        return organizeRecordsToView(MoneyRecords.find({type: "expense", expenseType: "additional", date: {$in: getDateFilter()}}));
    }
});