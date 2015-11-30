Vote = {};

Vote.addVote = function(websiteId, isUp){
    var ws = Vote.retrieveWebsite(websiteId)
    console.log("addVote, vote._id : " + ws._id)
    var upVotes = ws.upVotes;
    var downVotes = ws.downVotes;
    if (isUp)
    {
        upVotes += 1;
        Websites.update({ _id: ws._id}, {$set: {upVotes: upVotes}})
    }else{
        downVotes += 1;
        Websites.update({ _id: ws._id}, {$set: {downVotes: downVotes}})
    }
};

Vote.getUpVotes = function(websiteId){
    var ws = Vote.retrieveWebsite(websiteId);
    return ws.upVotes;
};

Vote.getDownVotes = function(websiteId){
    var ws = Vote.retrieveWebsite(websiteId);
    return ws.downVotes;
};

Vote.retrieveWebsite = function(websiteId){
    var websites = Websites.find({_id: websiteId});
    console.log("retrieveVote, websiteId : " + websiteId);
    var ws_array = websites.fetch();
    var ws_count = ws_array.length;
    console.log( "ws_count : " + ws_count)

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
}
