Meteor.startup(function () {
  Meteor.subscribe("moneyRecords");
  Meteor.subscribe("tasks");
});