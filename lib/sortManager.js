SortManager = {};

//fieldNames - array
//descending - boolean
SortManager.sortCollection = function(collectionName, fieldNames, descending, limit){
    var sortObject = {};
    var sort = {};

    var sortingDirection = descending == undefined || descending == false ? 1 : -1;
    for (var i = 0; i < fieldNames.length; i++)
    {
       sort[fieldNames[i]] = sortingDirection;
    };

    if (limit != undefined && limit > 0)
    {
        sort.limit = limit;
    };

    sortObject.sort = sort;

    var sortedCollection = collectionName.find({}, sortObject);
    return sortedCollection;

};