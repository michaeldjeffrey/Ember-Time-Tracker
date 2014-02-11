var TaskController = Ember.ObjectController.extend({
    oneHour: 1000 * 60 * 60,
    oneMin: 1000 * 60,
    oneSec: 1000,
    started: false,

    comment: '',

    display_time: function(){
        return this.get('model').get('display_time') || '00:00:00';
    }.property('model.display_time'),

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
        task.set('display_time', string);
        task.save();
    },
    getElapsed: function(){
        var task = this.get('model');
        // if the watch is stopped, use the date, else use now
        var elapsed = 0;
        if(this.get('started')){
            elapsed = new Date().getTime() - task.get('start_time');
        }

        elapsed += task.get('total_elapsed');
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
            milliseconds: ms
        };
    },
    actions: {
        addRating: function(parent){
            
            var text = this.get('comment');
            var date = moment().format("MM/DD/YYYY");
            var time = moment().format("hh:mm:ss");
            if(text === undefined || text.trim() === ""){
                return;
            }
            var hash = {date: date, time: time, note: text};
            var note = this.store.createRecord('note', hash);
            
            var task = this.get('model');
            var notes = task.get('notes');
            notes.pushObject(note);
            note.save();
            task.save();

            this.set('comment', '');
            
        },
        start: function(){
            var task = this.get('model');
            var delegate = function(that, method){ return function(){ return method.call(that)}};
            if(!this.get('started')){
                task.set('start_time', new Date().getTime());
                task.set('stop_time', 0);
                this.set('started', true);
                task.set('tick_interval', setInterval(delegate(this, this.onTick), task.get('tick_resolution')));
            }
        },
        stop: function(){
            var task = this.get('model');
            if(this.get('started')){
                task.set('stop_time', new Date().getTime());
                this.set('started', false);
                var elapsed = task.get('stop_time') - task.get('start_time');
                task.set('total_elapsed', this.get('total_elapsed') + elapsed);
                if(task.get('tick_interval') != null){
                    clearInterval(this.get('tick_interval'));
                }
            }
        },
        editTask: function(){
            this.set('isEditing', true);
        },
        doneEditing: function(){
            var bufferedTitle = this.get('bufferedTitle').trim();
            var bufferedAuthor = this.get('bufferedAuthor').trim();
            var bufferedContents = this.get('bufferedContents').trim();

            if(this.fieldIsEmpty(bufferedTitle, bufferedAuthor, bufferedContents)){
                Ember.run.debounce(this, this.send, 'removeTask', 0);
            } else {
                var task = this.get('model');
                task.set('title', bufferedTitle);
                task.set('author', bufferedAuthor);
                task.set('contents', bufferedContents);
                task.save();
            }

            this.set('bufferedTitle', bufferedTitle);
            this.set('bufferedAuthor', bufferedAuthor);
            this.set('bufferedContents', bufferedContents);
            this.set('isEditing', false);
        },
        cancelEditing: function(){
            this.set('bufferedTitle', this.get('title'));
            this.set('bufferedAuthor', this.get('author'));
            this.set('bufferedContents', this.get('contents'));
            this.set('isEditing', false);
        },
        removeTask: function(){
            var task = this.get('model');

            task.deleteRecord();
            task.save();
        }
    }
})

export default TaskController