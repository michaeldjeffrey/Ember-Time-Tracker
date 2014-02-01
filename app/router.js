var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('about');
  this.resource('tasks', function(){
    this.resource('task', {path: ':task_id'});
  });
  this.route('settings');
});

export default Router;
