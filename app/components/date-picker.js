var Datepicker = Ember.Component.extend({
    setupDatePicker: function(){
        var self = this;
        return this.$('.datepicker').datepicker({
            separator: '-',
            autoclose: true,
        }).on('changeDate', function(event){
            return self.set('value', self.format(event.date));
        });
    }.on('didInsertElement'),

    formattedValue: function(){
        var value = this.get('value');
        if(value){
            return this.format(value);
        }
    }.property('value'),

    format: function(value){
        return moment.utc(value).format('MM/DD/YYYY');
    }
})

export default Datepicker