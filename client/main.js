

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
        var votes = Votes.find({});
        console.log("votes.length : " + votes.count())
        console.log(votes)
        return sites;
    }
});


Template.website_item.rendered = function() {

};

Template.website_details.helpers({

    image: function(){
        return Meteor.call("getWebsiteData", Template.parentData().url, function(error, response){
            if (error){
                console.log(" website data callback error");
                console.log (error)
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
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log(Meteor.user());
        console.log("Up voting website with id "+website_id);
        // put the code in here to add a vote to a website!

        Vote.addVote(website_id, true);
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote":function(event){

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log(Meteor.user());
        console.log("Down voting website with id "+website_id);

        // put the code in here to remove a vote from a website!
        Vote.addVote(website_id, false);
        return false;// prevent the button from reloading the page
    },

    "click .js-item": function(event){
        console.log (this.data)
        console.log(event)
    },

    "load" : function(event){
        console.log ( " === item loaded");
    }
});


Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        console.log("The url they entered is: "+url);

        //  put your website saving code in here!

        return false;// stop the form submit from reloading the page

    }
});