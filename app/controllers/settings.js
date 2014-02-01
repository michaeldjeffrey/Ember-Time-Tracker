var SettingsController = Ember.Controller.extend({
    firstname: 'Michael',
    lastname: 'Jeffrey',
    saveOnEnter: false,
    isEditing: false,
    storageLocations: ['Local Storage (Default)', 'FireBase'],
    storageLocation: 'Local Storage (Default)',
    firebaseUrl: 'Empty',

    fullname: function(){
        return [this.get('firstname'), this.get('lastname')].join(' ');
    }.property('firstname', 'lastname'),
    saveOnEnterString: function(){
        return this.get('saveOnEnter') ? 'Yes' : 'No';
    }.property('saveOnEnter'),
    usingFirebase: function(){
        return this.get('storageLocation').toLowerCase() == 'FireBase'.toLowerCase();
    }.property('storageLocation'),

    actions: {
        edit: function(){
            this.set('isEditing', true);
        },
        done: function(){
            this.set('isEditing', false);
        }
    }

});

export default SettingsController