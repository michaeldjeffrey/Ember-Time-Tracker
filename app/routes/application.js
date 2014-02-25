var ApplicationRoute = Ember.Route.extend({
    model: function(){
        this.store.push('User', {
            id: 1,
            username: 'migpok35',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            save_frequency: 5000
        });
    }
});

export default ApplicationRoute;