/// routing
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'

});

Router.route('/', function(){
    this.render('websiteNav', {
        to: "navbar"
    });
    this.render('website_form',{
        to: "websiteForm"
    });
    /*this.render('loading', {
        to: "loading"
    });*/
    this.render('website_list', {
        to: "main"
    });
});

Router.route('/images', function () {
    this.render('websiteNav', {
        to: "navbar"
    });

    this.render('website_form',{
       to: "websiteForm"
    });
    this.render('website_list', {
        to: "main"
    });
});

Router.route('/website/:_id', function () {
    this.render('websiteNav', {
        to: "navbar"
    });
    this.render('websiteDetailsFull', {
        to: "main",
        data:function(){
            return Websites.findOne({_id:this.params._id})
        }
    });
});