/// routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function(){
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
    this.render('website_details', {
        to: "main",
        data:function(){
            return Websites.findOne({_id:this.params._id})
        }
    });
});