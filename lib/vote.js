Vote = {};

Vote.addVote = function(websiteId, isUp){
    var vote = Vote.retrieveVote(websiteId)
    if (vote) {

        console.log("addVote, vote._id : " + vote._id)
        var upVotes = vote.upVotes ? vote.upVotes : 0;
        var downVotes = vote.downVotes ? vote.downVotes : 0;
        if (isUp)
        {
            upVotes += 1;
            Votes.update({ _id: vote._id}, {$set: {upVotes: upVotes}})
        }else{
            downVotes += 1;
            Votes.update({ _id: vote._id}, {$set: {downVotes: downVotes}})
        }
    }
}



Vote.getUpVotes = function(websiteId){
    var vote = Vote.retrieveVote(websiteId);
    var upVotes = vote.upVotes ? vote.upVotes : 0;
    return upVotes;
}

Vote.getDownVotes = function(websiteId){
    var vote = Vote.retrieveVote(websiteId);
    var downVotes = vote.downVotes ? vote.downVotes : 0;
    console.log ("getDownVotes : " + downVotes);
    return downVotes;
}

Vote.retrieveVote = function(websiteId){
    var votes = Votes.find({websiteId: websiteId});
    console.log("retrieveVote, websiteId : " + websiteId);
    var votes_array = votes.fetch();
    var vote_count = votes.count();
    console.log("votecount : " + vote_count);
    if (vote_count == 0) {
        console.log("!!! inserting votes");
        Votes.insert({
            websiteId: websiteId,
            upVotes: 0,
            downVotes: 0
        });
    }
    var votes = Votes.find({websiteId: websiteId});
    var votes_array = votes.fetch();
    console.log(votes_array[0]);
    return votes_array[0];
}
