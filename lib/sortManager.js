SortManager = {};

//fieldNames - array
//descending - boolean
SortManager.sortCollection = function(collectionName, fieldNames, descending, limit){
    var sortObject = {};
    var sort = {};
    //var limit = limit != undefined ? limit : {};

    var sortingDirection = descending == undefined || descending == false ? 1 : -1;
    for (var i = 0; i < fieldNames.length; i++)
    {
       sort[fieldNames[i]] = sortingDirection;
    };

    sortObject.sort = sort;
    sortObject.limit = limit;
    console.log("limit : " + limit);
    console.log(limit);
    console.log(sortObject);

    //Websites.find({}, {sort: {upVotes: -1, createdOn: -1},  limit: Session.get("websiteLimit")});
    var sortedCollection = collectionName.find({}, sortObject);

    Session.set("sortFields", fieldNames);
    Session.set("sortFieldsOrder", sortingDirection);
    return sortedCollection;

};