Meteor.methods({
  addRecord: function (obj) {
    obj.insertAt = new Date();
    obj.usuario = this.userId;
    
    MoneyRecords.insert(obj);
  },
  removeRecord: function (id) {
    var usuario = this.userId;
    
    MoneyRecords.remove({_id: id, usuario: usuario});
  }
});