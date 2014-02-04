var attr = DS.attr

var Note = DS.Model.extend({
    date: attr(),
    time: attr(),
    note: attr(),
    task: DS.belongTo('task'),

    datetime: function(){
        return this.get('date') + ' ' + this.get('time');
    }.property('date', 'time')
})