var TasksRoute = Ember.Route.extend({
    model: function(){
        var store = this.get('store');
        store.find('task');
        return store.all('task');
    },
    setupController: function(controller, model){
        controller.set('model', model);
    },
})

export default TasksRoute