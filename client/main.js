/// infinite scroll
Session.set("websiteLimit", 6);
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
    console.log(" body clicked")
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
    limit: 5, // default 10
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

// HELPERS

Template.searchInputBox.helpers({
        websiteIndex: function(){
            return WebsiteIndex
        },
        searchResults: function(){
            return Session.get("searchResults");
        }
});

Template.body.helpers({
    username:function(){

        if (Meteor.user()){
            return Meteor.user().username;
        }
        else{
            return "guest"
        }
        return "n/a";
    },

});

Template.website_list.helpers({
    websites:function(){
        var sites =  SortManager.sortCollection(Websites, ["upVotes", "createdOn"], true ,Session.get("websiteLimit") );
        //Websites.find({}, {sort: {upVotes: -1, createdOn: -1},  limit: Session.get("websiteLimit")});
        return sites;
    }
});



Template.website_item.helpers({
    buttonsDisabled: function(){
        return VoteController.areVotingButtonsDisabled(this._id);
    },
    btnTooltip: function(){
        if(!Meteor.user()) {
            return "You must login to vote";
        } else if (VoteController.hasUpvoted(this._id)) {
            return "You voted up";
        } else if (VoteController.hasDownvoted(this._id)) {
            return "You voted down";
        }
    },
    upVotes: function(){
        return VoteController.getUpVotes(this._id)
    },
    hasUserUpvoted: function(){
        return VoteController.hasUpvoted(this._id)
    },
    hasUserDownvoted: function(){
      return VoteController.hasDownvoted(this._id)
    },

    downVotes: function(){
        return VoteController.getDownVotes(this._id)
    },

    addedOn: function(){
        return moment(this.createdOn).format("ddd, DD MMMM YYYY");
    },

    getUser:function(user_id) {
        var user = Meteor.users.findOne({_id: user_id});
        if (user) {
            return user.username;
        }
        else {
            return "n/a"
        }
    },

    getFormattedDescription: function(){
        var maxLength = 200;
        if (this.description == undefined || this.description.length == 0){
            return "";
        }
        if (this.description.length > maxLength)
        {
            var new_str = this.description.substr(0, maxLength);
            new_str += "...";
            return new_str;
        }
        return this.description;

    },

    websiteData: function(){
        return Session.get(this.url);
    }
});

Template.websiteDetailsFull.helpers({
    addedOn: function(){
        Session.get("selectedWebsite");
        console.log("session .getSelected website : " + Session.get("selectedWebsite"));
        return moment(this.createdOn).format("ddd, DD MMMM YYYY");
    },

    allSites: function(){
        var sortFields = Session.get("sortFields");
        var sortFieldsOrder = Session.get("sortFieldsOrder");
        var sites;
        if (sortFields == undefined)
        {
            sites =  Websites.find({}, {sort: {upVotes: -1, createdOn: -1}});
        }else
        {
            var desc = sortFieldsOrder == -1;
            sites = SortManager.sortCollection(Websites, sortFields, desc );
        }

        return sites;
    }
});

/////
// template events
/////

