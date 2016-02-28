getAmount = function(month, records){
  var recordsInMonth = _.filter(records.months, function(monthRecord) {
    return monthRecord.date.month === month.name.toLowerCase() && monthRecord.date.year === month.year;
  });

  if (!recordsInMonth.length) {
    return 0;
  }

  var amount = _.reduce(recordsInMonth, function(memo, record) {
    return memo + record.amount;
  }, 0);

  return amount;
};

moneyFormat = function(amount) {
  return 'R$ ' + (amount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.'));
};

calcNumberOfMonthsToShow = function(){
  return (Math.floor(window.innerWidth / 150) - 1) || 1;
};

balanceFormat = function(valor){
  var pre = "", pos = "";

  if(valor < 0){
    pre = '<span style="color: red">';
    pos = '</span>';
  }
  if(valor > 0){
    pre = '<span style="color: green">';
    pos = '</span>';
  }


  return pre + moneyFormat(valor) + pos;
};