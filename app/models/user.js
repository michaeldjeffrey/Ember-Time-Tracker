var attr = DS.attr;

var User = DS.Model.extend({
    username: attr(),
    first_name: attr(),
    last_name: attr(),
    email: attr(),
    phone_number: attr(),

    //settings
    storage_type: attr(),
    firebase_user: attr('boolean'),
    firebase_url: attr(),

    save_frequency: attr(),
});

User.reopenClass({
    FIXTURES: [
        {
            id: '1',
            username: 'migpok35',
            first_name: 'Michael',
            last_name: 'Jeffrey',
            email: 'migpok35@gmail.com',
            phone_number: '(480) 988-6841',

            storage_type: 'local_storage',
            firebase_user: false,
            firebase_url: false,

            save_frequency: 5000
        }
    ]
});

export default User;