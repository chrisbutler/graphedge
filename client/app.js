/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
  positionColor: function() {
    var p = Session.get('currentPosition');
    if (p == 'short') {
      return '#eb0028';
    } else if (p == 'long') {
      return '#00ae41';
    } else {
      return '#999999';
    }
  }
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

Meteor.startup(function() {
  Session.setDefault('currentTicker', 'AAPL');
  Session.setDefault('currentDuration', '3MO');
  Session.setDefault('currentPosition', 'neutral');
});

UI.registerHelper('fromSession', function (name) {
  return Session.get(name);
});
