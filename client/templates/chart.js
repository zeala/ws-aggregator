Template.chart.helpers({
    website_item: function(){
        return Websites.find({_id: Template.parentData()._id}).fetch()[0];;
    }
});

Template.chart.rendered = function () {

    var website_item = Websites.find({_id: Template.parentData()._id}).fetch()[0];
    Session.set("votes", ['votes', website_item.upVotes, website_item.downVotes])
    var chart = c3.generate({
        bindTo: '#uv-div',
        size: {
            height: 55
        },
        bar: {
            width: 15
        },
        padding: {
            left: 75
        },
        color: {
            pattern: ['#457D4B', '#2458AB']
        },
        data: {
            columns: [
                ['votes', website_item.upVotes, website_item.downVotes]
            ],
            types: {
                votes: 'bar'
            },
            labels : true,

            color: function(inColor, data) {
                var colors = ['#457D4B', '#2458AB'];
                if(data.index !== undefined) {
                    return colors[data.index];
                }

                return inColor;
            }
        },
        xs: {
            data1: 'x1',
            data2: 'x2',
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                categories: ['Up votes', 'Down votes'],
                tick: {
                    format: function (x) {
                        var str = x == 0 ? "Up votes" : "Down votes"
                        return str;
                    }
                }
            },
            y: {
                show: false
            }
        },

        legend: {
            show: false
        }
    });

    this.autorun(function (tracker) {
        chart.load({columns: [
            Session.get('votes'),
            []
        ]});
    });
};

