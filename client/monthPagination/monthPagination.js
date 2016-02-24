Template.monthPagination.events({
  "click .previous": function(e, context) {
    e.preventDefault();
    var adjust = currentMonthDisplacement.get();
    if (adjust > -10) {
      currentMonthDisplacement.set(adjust - 1);
    }
  },
  "click .next": function(e, context) {
    e.preventDefault();
    var adjust = currentMonthDisplacement.get();
    if (adjust < 9) {
      currentMonthDisplacement.set(adjust + 1);
    }
  },
  "click .current-month": function(e, context) {
    e.preventDefault();
    currentMonthDisplacement.set(0);
  }
});