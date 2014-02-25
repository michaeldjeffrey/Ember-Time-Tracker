var ApplicationController = Ember.ObjectController.extend({
    oneHour: 1000 * 60 * 60,
    oneMin: 1000 * 60,
    oneSec: 1000,
    started: false,
    tick_resolution: 500,
    tick_interval: null,
    total_elapsed: 0,
    display_hours: function(){
        return moment.duration(this.get('display_time')).hours() || '0';
    }.property('display_time'),
    display_minutes: function(){
        return moment.duration(this.get('display_time')).minutes() || '0';
    }.property('display_time'),
    display_seconds: function(){
        return moment.duration(this.get('display_time')).seconds() || '0';
    }.property('display_time'),
    zpad: function(no, digits){
        no = no.toString();
        while(no.length < digits){
            no = "0"+no;
        }
        return no;
    },
    onTick: function(){
        var e = this.getElapsed();
        console.log(e)
        var string = e.hours +':'+ e.minutes +':'+ e.seconds;
        this.set('display_time', string);
    },
    getElapsed: function(){
        var elapsed = 0;
        if(this.get('started')){
            elapsed = new Date().getTime() - this.get('start_time');
        }
        elapsed += this.get('total_elapsed');
        var hours = parseInt(elapsed / this.get('oneHour'));
        elapsed %= this.get('oneHour');
        var mins = parseInt(elapsed / this.get('oneMin'));
        elapsed %= this.get('oneMin');
        var secs = parseInt(elapsed / this.get('oneSec'));
        var ms = elapsed % this.get('oneSec');

        return {
            hours: this.zpad(hours, 2),
            minutes: this.zpad(mins, 2),
            seconds: this.zpad(secs, 2),
            milliseconds: this.zpad(ms, 2),
        };
    },
    actions: {
        start: function(){
            var delegate = function(that, method){ return function(){ return method.call(that)}};
            if(!this.get('started')){
                this.set('start_time', new Date().getTime());
                this.set('stop_time', 0);
                this.set('started', true);
                this.set('tick_interval', setInterval(delegate(this, this.onTick), this.get('tick_resolution')));
            }
        },
        stop: function(){
            if(this.get('started')){
                this.set('stop_time', new Date().getTime());
                this.set('started', false);
                var elapsed = this.get('stop_time') - this.get('start_time');
                this.set('total_elapsed', this.get('total_elapsed') + elapsed);
                if(this.get('tick_interval') != null){
                    clearInterval(this.get('tick_interval'));
                }
            }
        }
    }
});

export default ApplicationController;