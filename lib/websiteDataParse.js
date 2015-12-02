WebsiteParser = {};

WebsiteParser.parseSiteData = function(dataObj){
    if (dataObj == undefined) {
        return undefined;
    }else
    {
        if (dataObj.content == undefined){
            return undefined;
        }
        else{
            console.log(dataObj);
            WebsiteParser.parseContent(dataObj.content);

        }
    }
}

WebsiteParser.parseContent = function(content){

    /*let xml2json = Meteor.npmRequire( 'xml2json' );

    convertXmlToJson = ( xmlString ) => {
        return xml2json.toJson( xmlString , { object: true } );
    };*/
    //console.log(content);
    console.log(XML2JSON.xml2json(content))
}