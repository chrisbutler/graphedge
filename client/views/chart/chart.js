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
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
      },
      title: {
          text: 'Live random data'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: 'Value'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
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
      series: [{
          name: 'Random data',
          data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                  data.push({
                      x: time + i * 1000,
                      y: Math.random()
                  });
              }
              return data;
          }())
      }]
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