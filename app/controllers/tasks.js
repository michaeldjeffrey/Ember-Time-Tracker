var TasksController =  Ember.ArrayController.extend({
    itemController: 'task',
    showForm: true,
    date_created: new moment().format('MM/DD/YYYY'),
    actions: {
        add: function(){
            this.set('showForm', true);
        },
        cancel: function(){
            this.set('showForm', false);
            this.set('newTitle', '');
            this.set('newAuthor', '');
            this.set('newContents', '');
        },
        createTask: function(){
            var title, author, contents, task;

            title = this.get('newTitle').trim();
            author = this.get('newAuthor').trim();
            contents = this.get('newContents').trim();

            if(!title || !author || !contents){
                return;
            }

            console.log(title, author, contents)

            task = this.store.createRecord('task', {
                title: title,
                author: author,
                contents: contents
            });
            task.save();

            this.set('newTitle', '');
            this.set('newAuthor', '');
            this.set('newContents', '');

            this.set('showForm', false);
        }
    },
})

export default TasksController;