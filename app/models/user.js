var attr = DS.attr;

var User = DS.Model.extend({
    username: attr(),
    first_name: attr(),
    last_name: attr(),
    email: attr(),
    phone_number: attr(),
    full_name: function(){
        return this.get('first_name') + ' ' + this.get('last_name');
    }.property('first_name', 'last_name'),

    //settings
    storage_type: attr(),
    firebase_user: attr('boolean'),
    firebase_url: attr(),

    save_frequency: attr(),
    default_task_for: attr('string', {defaultValue: this.get('full_name') }),
});

User.reopen({
    url: 'localhost/users'
});

export default User;