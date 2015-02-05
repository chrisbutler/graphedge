/*****************************************************************************/
/* Chart: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Chart.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Chart.helpers({
  stockChart: function() {
    return {
      chart: {
        type: 'area',
        animation: Highcharts.svg, // don't animate in old IE
        backgroundColor: 'rgba(255,255,255,0.002)',
        spacing: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        events: {
          load: function () {
            var ch = this;
            Tracker.autorun(function() {
              Meteor.call('/app/chart/get/30day', Session.get('currentTicker'), function(err, reply) {
                if (!err) {
                  var price = [];
                  for (var i = 0; i < reply.length; i++) {
                    console.log(reply[i]);
                    if (reply[i]) {
                      price.push([reply[i].date.valueOf(),reply[i].close]);
                    }
                  }
                  ch.addSeries({                        
                    name: 'price',
                    data: price,
                    color: App.helpers.positionColor()
                  }, false);
                  ch.redraw();
                  console.log('chart', ch);
                }
              });
            });
          }
        }
      },
      title: {
        text: null,
      },
      xAxis: {
        type: 'datetime',
        startOnTick: false,
        tickPosition: 'inside',
        minPadding: 0,
        maxPadding: 0,
        labels: {
          style: {'color': 'white', 'text-transform': 'uppercase'},
          align: 'left',
          x: 15,
          y: -5
        }
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          style: {color: '#CCCCCC'},
          align: 'left',
          x: 15,
          y: -5
        },
        min: 50,
        plotLines: [{
          value: 0,
          width: 1,
          color: App.helpers.positionColor()
        }]
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    }
  },
  pieChart: function() {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: this.username + "'s top genres"
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
      },
      series: [{
          type: 'pie',
          name: 'genre',
          data: [
              ['Adventure',   45.0],
              ['Action',       26.8],
              ['Ecchi',   12.8],
              ['Comedy',    8.5],
              ['Yuri',     6.2]
          ]
      }]
    }
  }
});

/*****************************************************************************/
/* Chart: Lifecycle Hooks */
/*****************************************************************************/
Template.Chart.created = function () {
};

Template.Chart.rendered = function () {
};

Template.Chart.destroyed = function () {
};