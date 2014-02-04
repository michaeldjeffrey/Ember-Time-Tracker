var attr = DS.attr;

var Task = DS.Model.extend({

    title: attr(),
    author: attr(),
    contents: attr(),
    date_created: attr(),
    date_due: attr(),

    notes: DS.hasMany('task'),

    start_time: attr(),
    stop_time: attr(),
    total_elapsed: attr('number', {defaultValue: 0}),
    listener: attr(),
    tick_resolution: attr('number', {defaultValue: 500}),
    tick_interval: attr(),
    display_time: attr('string', {defaultValue: '00:00:00'}),
})

Task.reopenClass({
    FIXTURES: [
        {
            id: '1',
            title: 'First Post',
            author: 'Michael Jeffrey',
            contents: 'working on it',
            date_created: '12.1.1'
        }
    ]
});

export default Task