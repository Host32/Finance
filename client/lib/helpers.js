moneyFormat = function(amount) {
  return 'R$ ' + (amount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.'));
};

calcNumberOfMonthsToShow = function(){
  return (Math.floor(window.innerWidth / 150) - 1) || 1;
};