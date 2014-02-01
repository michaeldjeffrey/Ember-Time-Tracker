var TaskController = Ember.ObjectController.extend({
    oneHour: 1000 * 60 * 60,
    oneMin: 1000 * 60,
    oneSec: 1000,

    is_counting: function(){
        return this.get('model').get('started') || false;
    }.property('model.started'),
    time: function(){
        return this.get('model').get('time') || '00:00:00';
    }.property('model.time'),

    bufferedTitle: Ember.computed.oneWay('title'),
    bufferedAuthor: Ember.computed.oneWay('author'),
    bufferedContents: Ember.computed.oneWay('contents'),

    zpad: function(no, digits){
        no = no.toString();
        while(no.length < digits){
            no = '0'+no;
        }
        return no;
    },
    fieldIsEmpty: function(one, two, three){
        var title = Ember.isEmpty(one);
        var author = Ember.isEmpty(two);
        var contents = Ember.isEmpty(three);
        return title && author && contents;
    },
    onTick: function(){
        var task = this.get('model');
        var e = this.getElapsed();
        var string = e.hours +":"+ e.minutes +":"+ e.seconds;
        console.log(string);
        task.set('time', string);
    },
    getElapsed: function(){
        var task = this.get('model');
        // if the watch is stopped, use the date, else use now
        var elapsed = 0;
        if(task.get('started')){
            elapsed = new Date().getTime() - task.get('startTime');
        }

        elapsed += task.get('totalElapsed');
        var hours = parseInt(elapsed / task.get('oneHour'));
        elapsed %= this.get('oneHour');
        var mins = parseInt(elapsed / this.get('oneMin'));
        elapsed %= this.get('oneMin');
        var secs = parseInt(elapsed / this.get('oneSec'));
        var ms = elapsed % this.get('oneSec');

        return {
            hours: this.zpad(hours, 2),
            minutes: this.zpad(mins, 2),
            seconds: this.zpad(secs, 2),
            milliseconds: ms
        };
    },
    actions: {
        start: function(){
            var task = this.get('model');
            var delegate = function(that, method){ return function(){ return method.call(that)}};
            if(!task.get('started')){
                task.set('startTime', new Date().getTime());
                task.set('stopTime', 0);
                task.set('started', true);
                task.set('tickInterval', setInterval(delegate(this, this.onTick), task.get('tickResolution')));
            }
        },
        stop: function(){
            var task = this.get('model');
            if(task.get('started')){
                task.set('stopTime', new Date().getTime());
                task.set('started', false);
                var elapsed = task.get('stopTime') - task.get('startTime');
                task.set('totalElapsed', this.get('totalElapsed') + elapsed);
                if(task.get('tickInterval') != null){
                    clearInterval(this.get('tickInterval'));
                }
            }
        },
        // reset: function(){
            // var task = this.get('model');
            // task.set('totalElapsed', 0);
            // task.set('startTime', new Date().getTime());
            // task.set('stopTime', task.get('startTime'));
        // },
        // editTask: function(){
            // this.set('isEditing', true);
        // },
        // doneEditing: function(){
            // var bufferedTitle = this.get('bufferedTitle').trim();
            // var bufferedAuthor = this.get('bufferedAuthor').trim();
            // var bufferedContents = this.get('bufferedContents').trim();
// 
            // if(this.fieldIsEmpty(bufferedTitle, bufferedAuthor, bufferedContents)){
                // Ember.run.debounce(this, this.send, 'removeTask', 0);
            // } else {
                // var task = this.get('model');
                // task.set('title', bufferedTitle);
                // task.set('author', bufferedAuthor);
                // task.set('contents', bufferedContents);
                // task.save();
            // }
// 
            // this.set('bufferedTitle', bufferedTitle);
            // this.set('bufferedAuthor', bufferedAuthor);
            // this.set('bufferedContents', bufferedContents);
            // this.set('isEditing', false);
        // },
        // cancelEditing: function(){
            // this.set('bufferedTitle', this.get('title'));
            // this.set('bufferedAuthor', this.get('author'));
            // this.set('bufferedContents', this.get('contents'));
            // this.set('isEditing', false);
        // },
        // removeTask: function(){
            // var task = this.get('model');
// 
            // task.deleteRecord();
            // task.save();
        // }
    }
})

export default TaskController