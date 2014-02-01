var attr = DS.attr;

var Task = DS.Model.extend({

    title: attr(),
    author: attr(),
    contents: attr(),
    date_created: attr(),
    date_due: attr(),

    start_time: attr(),
    stop_time: attr(),
    total_elapsed: attr('number', {defaultValue: 0}),
    listener: attr(),
    tick_resolution: attr('number', {defaultValue: 500}),
    tick_interval: attr(),
    display_time: attr('string', {defaultValue: '00:00:00'}),

    // reset: function(){
    //     this.set('total_elapsed', 0);
    //     this.set('start_time', new Date().getTime());
    //     this.set('stop_time', this.get('start_time'));
    // }.property('total_elapsed', 'start_time', 'stop_time'),

    // restart: function(){
    //     this.stop();
    //     this.reset();
    //     this.start();
    // },

    // setElapsed: function(hours, mins, secs){
    //     this.reset();
    //     this.set('total_elapsed', 0);
    //     this.set('total_elapsed', this.get('total_elapsed') + (hours * this.get('oneHour')));
    //     this.set('total_elapsed', this.get('total_elapsed') + (mins * this.get('oneMin')));
    //     this.set('total_elapsed', this.get('total_elapsed') + (secs * this.get('oneSec')));
    //     this.set('total_elapsed', Math.max(this.get('total_elapsed'), 0));
    // },

    // toString: function(){
    //     var zpad = function(no, digits){
    //         no = no.toString();
    //         while(no.length < digits){
    //             no = '0' + no;
    //         }
    //         return no
    //     }
    //     var e = this.getElapsed()
    //     return zpad(e.hours, 2) + ":" + zpad(e.minutes, 2) + ":" + zpad(e.seconds, 2);
    // }.property('getElapsed'),

    // setListener: function(listener){
    //     this.set('listener', listener);
    // },

    // onTick: function(){
    //     // if(this.get('listener') != null){
    //     //     this.listener(this)
    //     // }
    //     console.log('ontick method getting called')
    // }
    
})

export default Task