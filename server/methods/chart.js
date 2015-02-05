/*****************************************************************************/
/* Chart Methods */
/*****************************************************************************/

Meteor.methods({
  '/app/chart/get/30day': function (ticker) {
    var Future = Npm.require('fibers/future');
    var fut = new Future();
    var end = moment();
    console.log('30 day', start.format(), end.format(), ticker);
    YahooFinance.historical({
      symbol: ticker,
      from: start.format(),
      to: end.format()
    }, function (err, quotes) {
      if (quotes) {
        fut.return(quotes);
      } else {
        fut.throw(new Error('Exception', err));
      }
    });
    return fut.wait();
  }
});
