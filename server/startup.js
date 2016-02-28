Meteor.startup(function () {
  Meteor.publish("moneyRecords", function(){
    return MoneyRecords.find({usuario: this.userId });
  });
});