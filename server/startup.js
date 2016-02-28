Meteor.startup(function () {
  Meteor.publish("moneyRecords", function(){
    return MoneyRecords.find({usuario: this.userId });
  });

  Meteor.publish("tasks", function(){
    return Tasks.find({usuario: this.userId });
  });
});