

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
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
        var sites =  Websites.find({});
        return sites;
    }
});


Template.website_item.rendered = function() {

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
        return Vote.getUpVotes(this._id)
    },

    downVotes: function(){

        return Vote.getDownVotes(this._id)
    }

});


/////
// template events
/////

Template.website_item.rendered = function(){
    this.self = this;
};

Template.website_item.events({
    "click .js-upvote":function(event){
        var website_id = this._id;
        // put the code in here to add a vote to a website!

        Vote.addVote(website_id, true);
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote":function(event){
        var website_id = this._id;
        // put the code in here to remove a vote from a website!
        Vote.addVote(website_id, false);
        return false;// prevent the button from reloading the page
    },

    "click .js-item": function(event){

    },

    "load" : function(event){
    }
});


Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.title.description;
        var createdOn = new Date();
        var createdBy = Meteor.userId();

        console.log(" url: " + url + " createdBy : " + createdBy);

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

        return false;// stop the form submit from reloading the page

    }
});