var ApplicationController = Ember.ObjectController.extend({
    oneHour: 1000 * 60 * 60,
    oneMin: 1000 * 60,
    oneSec: 1000,
    started: false,
    duration_display: function(){
        return '00:00:00';
    }.property('time'),
    zpad: function(no, digits){
        no = no.toString();
        while(no.length < digits){
            no = "0"+no;
        }
        return no;
    },
    onTick: function(){
        var timer = this.get('model');
        var e = this.getElapsed();
        var string = e.hours +':'+ e.minutes +':'+ e.seconds;
        timer.set('display_time', string);
        timer.save();
    },
    getElapsed: function(){
        var timer = this.get('model');
        var elapsed = 0;
        if(this.get('started')){
            elapsed = new Date().getTime() - timer.get('start_time');
        }
        elapsed += timer.get('total_elapsed');
        var hours = parseInt(elapsed / this.get('oneHour'));
        elapsed %= this.get('oneHour');
        var mins = parseInt(elapsed / this.get('oneMin'));
        elapsed %= this.get('oneMin');
        var secs = parseInt(elapsed / this.get('oneSec'));
        var ms = elapsed % this.get('oneSec');

        return {
            hours: this.zpad(hours, 2),
            minutes: this.zpad(min, 2),
            seconds: this.zpad(sec, 2),
            milliseconds: this.zpad(ms, 2),
        };
    }
});

export default ApplicationController;