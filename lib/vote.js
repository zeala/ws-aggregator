VoteController = {};

VoteController.addVote = function(websiteId, isUp){
    var ws = VoteController.retrieveWebsite(websiteId);
    console.log("addVote, vote._id : " + ws._id);
    var upVotes = ws.upVotes;
    var downVotes = ws.downVotes;
    if (isUp)
    {
        upVotes += 1;
        Websites.update({ _id: ws._id}, {$set: {upVotes: upVotes}});
        VoteController.updateUpvotes(websiteId);
        UserActivityTracker.updateUpVotesForUser(websiteId, Meteor.user()._id);

    }else{
        downVotes += 1;
        Websites.update({ _id: ws._id}, {$set: {downVotes: downVotes}});
        VoteController.updateDownvotes(websiteId);
        UserActivityTracker.updateDownVotesForUser(websiteId, Meteor.user()._id);
    }
};

VoteController.getUpVotes = function(websiteId){
    var ws = VoteController.retrieveWebsite(websiteId);
    return ws.upVotes;
};

VoteController.getDownVotes = function(websiteId){
    var ws = VoteController.retrieveWebsite(websiteId);
    return ws.downVotes;
};

VoteController.retrieveWebsite = function(websiteId){
    var websites = Websites.find({_id: websiteId});
    var ws_array = websites.fetch();
    var ws_count = ws_array.length;

    if (ws_count == 0) {
        console.log("!!! Error: website is not found");
        return;
    }
    var website = ws_array[0];
    if(website.upVotes == undefined){
        Websites.update({_id : website._id}, {$set: {upVotes: 0}})
    }
    if (website.downVotes == undefined){
        Websites.update({_id: website._id}, {$set: {downVotes: 0}})
    }
    return website;
};

VoteController.updateUpvotes = function (websiteId){
    var upvotes_array = UpVotes.find({websiteId: websiteId, userId: Meteor.user()._id}).fetch();
    if (upvotes_array.length == 0){
        console.log ("adding a record to the db");
        UpVotes.insert({
            websiteId: websiteId,
            userId: Meteor.user()._id
        });
    }else{
        console.log ("FOUND ONE !!");
    }
};

VoteController.updateDownvotes = function(websiteId){
    var downvotes_array = UpVotes.find({websiteId: websiteId, userId: Meteor.user()._id}).fetch();
    if (downvotes_array.length == 0){
        DownVotes.insert({
            websiteId: websiteId,
            userId: Meteor.user()._id
        })
    }
};

VoteController.hasUpvoted = function(websiteId){
    var upvotes_array = UpVotes.find({websiteId: websiteId, userId: Meteor.user()._id}).fetch();
    return upvotes_array.length > 0;
};

VoteController.hasDownvoted = function(websiteId){
    var downvotes_array = DownVotes.find({websiteId: websiteId, userId: Meteor.user()._id}).fetch();
    return downvotes_array.length > 0;
};

VoteController.areVotingButtonsDisabled = function(websiteId){
    var isDisabled = Meteor.user() == null
        || VoteController.hasDownvoted(websiteId)
        || VoteController.hasUpvoted(websiteId);

    return isDisabled;
};