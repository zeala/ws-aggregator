/*Template.loading.rendered = function () {
    if ( ! Session.get('loadingSplash') ) {
        this.loading = window.pleaseWait({
            logo: '/images/Meteor-logo.png',
            backgroundColor: '#7f8c8d',
            loadingHtml: message + spinner
        });
        Session.set('loadingSplash', true); // just show loading splash once
    }
};*/
Template.registerHelper('getBody', function () {
    return Session.get('splashLoaded') ? 'home' : 'loading';
});

Template.loading.rendered = function () {
    if ( ! Session.get('loadingSplash') ) {
        this.loading = window.pleaseWait({
            logo: '/images/Meteor-logo.png',
            backgroundColor: '#7f8c8d',
            loadingHtml: message + spinner
        });
        Session.set('loadingSplash', true); // just show loading splash once
    }
};

/*Template.loading.rendered = function () {
    // launch splash
    console.log ( "LOAD SPLASH SCREEN")
    this.loading = window.pleaseWait({
        logo: '/images/Meteor-logo.png',
        backgroundColor: '#7f8c8d',
        loadingHtml: message + spinner
    });

    // manually remove loading for demo
    var loading = this.loading;
    Meteor.setTimeout(function () {
        loading.finish();
        Session.set('splashLoaded', true);
    }, 3000);
};*/


Template.loading.destroyed = function () {
    if ( this.loading ) {
        this.loading.finish();
    }
};

var message = '<p class="loading-message">Loading..</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';