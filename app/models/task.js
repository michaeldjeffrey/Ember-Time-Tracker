var attr = DS.attr;

var Task = DS.Model.extend({

    title: attr(),
    author: attr(),
    contents: attr(),

    startTime: attr(),
    stopTime: attr(),
    totalElapsed: attr('number', {defaultValue: 0}),
    started: attr(),
    listener: attr(),
    tickResolution: attr('number', {defaultValue: 500}),
    tickInterval: attr(),
    display_time: attr('string', {defaultValue: '00:00:00'}),

    // reset: function(){
    //     this.set('totalElapsed', 0);
    //     this.set('startTime', new Date().getTime());
    //     this.set('stopTime', this.get('startTime'));
    // }.property('totalElapsed', 'startTime', 'stopTime'),

    // restart: function(){
    //     this.stop();
    //     this.reset();
    //     this.start();
    // },

    // setElapsed: function(hours, mins, secs){
    //     this.reset();
    //     this.set('totalElapsed', 0);
    //     this.set('totalElapsed', this.get('totalElapsed') + (hours * this.get('oneHour')));
    //     this.set('totalElapsed', this.get('totalElapsed') + (mins * this.get('oneMin')));
    //     this.set('totalElapsed', this.get('totalElapsed') + (secs * this.get('oneSec')));
    //     this.set('totalElapsed', Math.max(this.get('totalElapsed'), 0));
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