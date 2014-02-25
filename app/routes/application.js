var ApplicationRoute = Ember.Route.extend({
    model: function(){
        this.store.push('User', {
            id: 1,
            username: 'hunter1',
            first_name: 'Michael',
            last_name: 'Jeffrey',
            email: 'hunter1@mailinator.com',
            phone_number: '480-555-5555',
            save_frequency: 5000
        });
        return this.store.find('user', 1);
    },
});

export default ApplicationRoute;