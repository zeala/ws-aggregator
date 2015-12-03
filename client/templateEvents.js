Template.searchInputBox.events({
    "keyup #searchInput": function(event, element){
        var str = $('#searchInput').val();
        var cursor = WebsiteIndex.search(str);
        console.log(cursor.fetch());
        console.log(cursor.count());
        console.log("string : " + str);
        Session.set("searchResults", cursor.fetch());

        if (cursor.count() == 0 || str == undefined || str == ""){
            $('#searchDropDown').hide();
        }else{
            $('#searchDropDown').show();
        }
    },
    "click #searchInput": function(event){
        var str = $('#searchInput').val();
        if (str && str.length > 0){
            console.log("string.length : " + str.length);
            $('#searchDropDown').toggle();
        }else{
            $("#searchDropDown").hide();
        }
    },

    "click .search-list-item": function(event, element){
        console.log(this);
        //Session.set("votes", ['votes', website_item.upVotes, website_item.downVotes])
        var website_item = Websites.find({_id: this._id}).fetch()[0];
        Session.set("votes", ['votes', website_item.upVotes, website_item.downVotes])
    }


   /*  $('body').on('click', function (e) {
     if (!$('li.dropdown.mega-dropdown').is(e.target)
     && $('li.dropdown.mega-dropdown').has(e.target).length === 0
     && $('.open').has(e.target).length === 0
     ) {
     $('li.dropdown.mega-dropdown').removeClass('open');
     }
     });*/
});


Template.website_item.events({
    "click .js-upvote":function(event){
        var website_id = this._id;
        if (VoteController.areVotingButtonsDisabled(website_id)) return;
        //otherwise update the vote
        VoteController.addVote(website_id, true);
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote":function(event){
        var website_id = this._id;
        if (VoteController.areVotingButtonsDisabled(website_id)) return;
        //otherwise update the vote
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

Template.website_details.events({
    "click .js-get-data":function(event){
        console.log(this);
        console.log(Template.parentData().websiteData);
        console.log(Session.get(this.url));
    }
});