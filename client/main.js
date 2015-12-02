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

/*Tracker.autorun(function () {
    var cursor = WebsiteIndex.search('bbc'); // search all docs that contain "Marie" in the name or score field

    console.log(cursor.fetch()); // log found documents with default search limit
    console.log(cursor.count()); // log count of all found documents
});*/


Template.websiteNav.rendered = function() {
    if(!Meteor.user()) {
        $('.login-link-text').text("Sign Up/Sign In");
    } else {
        $('.login-link-text').before('<span>Logged in as: </span>');
    }
};

// HELPERS

Template.searchBox.helpers({
        websiteIndex: function(){
            return WebsiteIndex
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
        var sites =  Websites.find({}, {sort: {upVotes: -1, createdOn: -1},  limit: Session.get("websiteLimit")});
        return sites;
    }
});



Template.website_item.rendered = function() {
    var instance = this;
    Meteor.defer(function(){
        $(instance.firstNode).addClass("just-added");
    });

    /*Meteor.call("getWebsiteData", instance.data.url, function(error, result){
        console.log("Session : " + Session + " instance : " + instance );
        console.log(result);
        if (Session.get(instance.data.url) == undefined)
        {
            //Session.set(instance.data.url, WebsiteParser.parseSiteData(result));

            return result;
        }
        else
        {
            console.log("WEBSITE DATA ALREADY EXISTS")
        }

    });*/
};



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
        //console.log("Session.get(url) : " + Session.get(this.url))
        console.log("--- website data : " + Session.get(this.url));
        return Session.get(this.url);
    }
});

Template.websiteDetailsFull.helpers({
    addedOn: function(){
        return moment(this.createdOn).format("ddd, DD MMMM YYYY");
    }
});

/////
// template events
/////

