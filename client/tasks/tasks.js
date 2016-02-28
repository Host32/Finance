Template.tasks.helpers({
  tasks: function () {
    return Tasks.find({});
  }
});

Template.tasks.events({
  'submit #task-form': function(event, context){
    event.preventDefault();

    var task = {
      description: $('#task-description').val().trim(),
      deadline: $('#task-deadline').val().trim()
    };

    Meteor.call("addTask", task);
  },
  'click .removeTaskButton': function(event, context){
    Meteor.call("removeTask", this._id);
  }
});