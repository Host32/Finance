Meteor.methods({
  addRecord: function (obj) {
    obj.insertAt = new Date();
    obj.usuario = this.userId;
    
    MoneyRecords.insert(obj);
  }
});