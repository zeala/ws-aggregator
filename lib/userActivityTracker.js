UserActivityTracker = {};

//static properties

UserActivityTracker.websites = "updateWebsiteAdditions";
UserActivityTracker.comments = "updateComments";
UserActivityTracker.upVotes = "updateVotes";
UserActivityTracker.downVotes = "downVotes";
UserActivityTracker.updateViews = "views";

UserActivityTracker.getUser = function(userId){
    var user = UserActivity.findOne({}, {userId: userId});

    if (user == undefined){
        UserActivity.insert({userId:userId});
        user = UserActivity.findOne({}, {userId: userId});
    }
    return user;
    //Meteor.user()._id;
};

UserActivityTracker.updateWebsitesByUser = function(website, userId){
    var userObj = UserActivityTracker.getUser(userId);
    if (userObj.websites == undefined){
        userObj.websites = [];
    }
    var websites = userObj.websites;

    if (!(website in userObj.websites)){
        userObj.websites.push(website);
        //Websites.update({ _id: ws._id}, {$set: {upVotes: upVotes}});
        UserActivity.update({_id: userObj._id}, {$set: {websites: websites}});
    }
};

UserActivityTracker.updateWebsitesByUser = function(website, userId){
    var userObj = UserActivityTracker.getUser(userId);
    if (userObj.upVotes == undefined){
        userObj.upVotes = {};
    }
    var upVotes = userObj.upVotes;

    if ( upVotes[website] == undefined){
        upVotes[website] = true;
        //Websites.update({ _id: ws._id}, {$set: {upVotes: upVotes}});
        UserActivity.update({_id: userObj._id}, {$set: {upVotes: upVotes}});
    }
};

UserActivityTracker.updateWebsitesByUser = function(website, userId){
    var userObj = UserActivityTracker.getUser(userId);
    if (userObj.downVotes == undefined){
        userObj.downVotes = {};
    }
    var downVotes = userObj.downVotes;

    if ( downVotes[website] == undefined){
        downVotes[website] = true;
        //Websites.update({ _id: ws._id}, {$set: {upVotes: upVotes}});
        UserActivity.update({_id: userObj._id}, {$set: {downVotes: downVotes}});
    }
};