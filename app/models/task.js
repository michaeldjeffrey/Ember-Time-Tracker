var attr = DS.attr;

var Task = DS.Model.extend({

    title: attr(),
    author: attr(),
    contents: attr(),
    date_created: attr(),
    date_due: attr(),

    notes: DS.hasMany('note', {async: true}),

    start_time: attr(),
    stop_time: attr(),
    total_elapsed: attr('number', {defaultValue: 0}),
    listener: attr(),
    tick_resolution: attr('number', {defaultValue: 500}),
    tick_interval: attr(),
    display_time: attr('string', {defaultValue: '00:00:00'}),
});

Task.reopenClass({
    url: 'localhost/tasks'
});

export default Task;