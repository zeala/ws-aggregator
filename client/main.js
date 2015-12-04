/// infinite scroll
Session.set("websiteLimit", 10);
lastScrollTop = 0;
$(window).scroll(function(event){

    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100)
    {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop)
        {
            Session.set("websiteLimit", Session.get("websiteLimit") + 4);
            lastScrollTop = scrollTop;
        }
    }
});

//$('body').on('click', function (event) {
$('body').click(function(event){
    if (!$(".search-list-item").is(event.target)
        && $('.search-list-item').has(event.target).length === 0
        && $('.open').has(event.target).lenght === 0) {
        $('.search-list-item').removeClass('open');
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

Comments.ui.config({
    limit: 10, // default 10
    loadMoreCount: 10, // default 20
    template: 'bootstrap', // default 'semantic-ui'
    defaultAvatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
});

WebsiteIndex = new EasySearch.Index({
    collection: Websites,
    fields: ['url', 'description', 'title'],
    engine: new EasySearch.Minimongo()
});


Template.websiteNav.rendered = function() {
    if(!Meteor.user()) {
        $('.login-link-text').text("Sign Up/Sign In");
    } else {
        $('.login-link-text').before('<span>Logged in as: </span>');
    }
};


