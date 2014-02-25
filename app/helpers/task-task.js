export default Ember.Handlebars.makeBoundHelper(function(task){
    var template = "%@1 <small> - by %@2</small>";
    return new Ember.Handlebars.SafeString(template.fmt(task.get('title'), task.get('author')));
});