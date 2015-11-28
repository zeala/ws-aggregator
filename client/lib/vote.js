function addVote(websiteId, isUp){
    var vote = Votes.find({websiteId: websiteId});
    if (!vote){
        Votes.insert({
           websiteId: websiteId,
           upVotes: isUp ? 1 : 0,
           downVotes: isUp ? 0 : 1
        });
    }else {
        var upVotes = vote.upVotes ? vote.upVotes : 0;
        var downVotes = vote.downVotes ? vote.downVotes : 0;
        if (isUp)
        {
            Votes.update({ _id: vote._id}, {$set: {upVotes: upVotes +=1}})
        }else{
            Votes.update({ _id: vote._id}, {$set: {downVotes: downVotes +=1}})
        }
    }
}

function getUpVotes(websiteId){
    var vote = Votes.find({websiteId: websiteId});
    var upVotes = vote.upVotes ? vote.upVotes : 0;
    return upVotes;
}

function getDownVotes(websiteId){
    var vote = Votes.find({websiteId: websiteId});
    var downVotes = vote.downVotes ? vote.downVotes : 0;
    return downVotes;
}

/*
 if (Meteor.user()){
 Images.insert({
 img_src: img_src,
 img_alt: img_alt,
 createdOn: new Date(),
 createdBy:Meteor.user()._id
 });
 }

 Images.update({_id : image_id}, {$set: {rating: rating }})
 */