var TaskRoute = Ember.Route.extend({
    model : function(params){
        return this.get('store').find('task', params.task_id);
    },
})

export default TaskRoute