Template.chart.helpers({
    website_item: function(){
        console.log("helpers, this : " + Template.parentData()._id);
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
            pattern: ['#FABF62', '#ACB6DD']
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
                var colors = ['#FABF62', '#ACB6DD'];
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
        console.log(" tracker : " + tracker);
        console.log(tracker);
        console.log("session get : " + Session.get('votes'));
        chart.load({columns: [
            Session.get('votes'),
            []
        ]});
    });

    console.log(" chart. rendered called ?")
}

    /*Session.set('x', ['x', 30, 50, 75, 100, 120]);
    Session.set('data1', ['data1', 30, 200, 100, 400, 150]);
    Session.set('data2', ['data2', 20, 180, 240, 100, 190]);
    var chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            xs: {
                'data1': 'x',
                'data2': 'x'
            },
            columns: [['x'],['data1'],['data2']]
        }
    });

    this.autorun(function (tracker) {
        chart.load({columns: [
            Session.get('x'),
            Session.get('data1'),
            Session.get('data2'),
            []
        ]});
    });*/

/*
var chart = c3.generate({
    bindto: '#uv-div',
    size: {
        height: 150
    },
    bar: {
        width: 40
    },
    padding: {
        left: 60
    },
    color: {
        pattern: ['#FABF62', '#ACB6DD']
    },
    data: {
        x: 'x',
        columns:
            [
                ['x', 'Category1', 'Category2'],
                ['value', 300, 400]
            ],

        type: 'bar',

        color: function(inColor, data) {
            var colors = ['#FABF62', '#ACB6DD'];
            if(data.index !== undefined) {
                return colors[data.index];
            }

            return inColor;
        }
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        }
    },
    tooltip: {
        grouped: false
    },
    legend: {
        show: false
    }
});*/
