var TasksRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('task');
    },
});

export default TasksRoute;