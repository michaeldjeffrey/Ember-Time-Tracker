var attr = DS.attr;

var Note = DS.Model.extend({
    date: attr(),
    time: attr(),
    note: attr(),

    datetime: function(){
        return this.get('date') + ' ' + this.get('time');
    }.property('date', 'time')
});

Note.reopen({
    url: 'localhost/notes'
});

export default Note;