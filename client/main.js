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


Template.websiteNav.rendered = function() {
    if(!Meteor.user()) {
        $('.login-link-text').text("Sign Up/Sign In");
    } else {
        $('.login-link-text').before('<span>Logged in as: </span>');
    }
};

// helper function that returns all available websites
Template.website_list.helpers({
    websites:function(){
        var sites =  Websites.find({}, {sort: {upVotes: -1, createdOn: -1},  limit: Session.get("websiteLimit")});
        return sites;
    }
});

Template.commentsBox.helpers({
    comment: function(){
        return [];
    }
   /* comment: function(){
        var cmts = UserComments.find({});
        var comments_array = cmts.fetch();
        console.log("***** cmts : " + cmts);
        console.log(cmts);
        console.log(comments_array);
        return comments_array;
    }*/
});


Template.website_item.rendered = function() {
    var instance = this;
    Meteor.defer(function(){
        $(instance.firstNode).addClass("just-added");
    })
};

Template.website_details.helpers({

    image: function(){
        return Meteor.call("getWebsiteData", Template.parentData().url, function(error, response){
            if (error){
            }
            return response;
        });
    }
});


Template.website_item.helpers({
    buttonsDisabled: function(){
        return Meteor.user() == null;
    },
    btnTooltip: function(){
        if(!Meteor.user()) {
            return "You must login to vote";
        } else {

        }
    },
    upVotes: function(){
        return VoteController.getUpVotes(this._id)
    },

    downVotes: function(){

        return VoteController.getDownVotes(this._id)
    },

    getFormattedDescription: function(){
        var maxLength = 30;
        if (this.description == undefined || this.description.length == 0){
            return "";
        }
        if (this.description.length > maxLength)
        {
            var new_str = this.description.substr(0, maxLength);
            new_str += "..."
            console.log("newStr : " + new_str)
            return new_str;
        }
        return this.description;

    }

});


/////
// template events
/////
Template.website_item.events({
    "click .js-upvote":function(event){
        if (!Meteor.user()) return;
        var website_id = this._id;
        // put the code in here to add a vote to a website!

        VoteController.addVote(website_id, true);
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote":function(event){
        if (!Meteor.user()) return;
        var website_id = this._id;
        // put the code in here to remove a vote from a website!
        VoteController.addVote(website_id, false);
        return false;// prevent the button from reloading the page
    },

    "click .js-item": function(event){

    },

    "load" : function(event){
    }
});


Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $('#loginModal').modal('show');
    },
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.description.value;
        var createdOn = new Date();
        var createdBy = Meteor.userId();

        if (Meteor.user()){
            Websites.insert({
                url: url,
                title: title,
                description: description,
                createdOn: createdOn,
                createdBy:Meteor.user()._id,
                upVotes: 0,
                downVotes: 0
            });
        }

        event.target.url.value = "";
        event.target.title.value = "";
        event.target.description.value = "";
        $('#loginModal').modal('hide');
        return false;// stop the form submit from reloading the page

    }
});