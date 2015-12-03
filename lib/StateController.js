StateController = {};

StateController.updateSelecteWebsite = function(website){
    var website_item = Websites.find({_id: website._id}).fetch()[0];
    Session.set("selectedWebsite", website);
    Session.set("votes", ['votes', website_item.upVotes, website_item.downVotes])
};