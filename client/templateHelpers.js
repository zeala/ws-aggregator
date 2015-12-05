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
    titleBtnTooltip: function(){
      return "Go to the website"
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

Template.userPreferences.helpers({
    addedSites: function(){
        var user = Meteor.user();
        if (user)
        {
            var sites = Websites.find({createdBy: user._id});
            return sites;
        }
        return undefined;
    },

    upVotedSites: function(){
        if (!Meteor.user()) return [];

        var userActivityObj = UserActivityTracker.getUser(Meteor.user()._id);
        var upVotedSitesObj = userActivityObj.upVotes;
        var siteIds = [];
        var siteArray = [];
        if (upVotedSitesObj != undefined){
            for (var site in upVotedSitesObj){
                siteIds.push(site);
            }
        }
        var siteCollection = Websites.find({_id: { $in: siteIds }});
        siteArray = siteCollection.fetch();

        return siteArray;
    },

    downVotedSites: function(){

        if (!Meteor.user()) return [];

        var userActivityObj = UserActivityTracker.getUser(Meteor.user()._id);
        var downVotedSitesObj = userActivityObj.downVotes;
        var siteIds = [];
        var siteArray = [];

        if (downVotedSitesObj != undefined){
            for (var site in downVotedSitesObj){
                siteIds.push(site);
            }
        }

        var siteCollection = Websites.find({_id: { $in: siteIds }});
        siteArray = siteCollection.fetch();
        return siteArray;
    },
    noDownVotes: function(downVotes){
        if (!downVotes) return true;
        return downVotes.length == 0;
    },
    noUpVotes: function(upVotes){
        if (!upVotes) return true;
        return upVotes.length == 0;
    },
    noAddedSites: function(addedSites){

        if (!addedSites || addedSites.length == 0 || addedSites.fetch().length == 0) return true;
        return addedSites.length == 0;
    }
});

Template.simpleTable.helpers({

})
