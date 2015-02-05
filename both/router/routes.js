/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/:ticker/:position', {
  name: 'chart',
  onBeforeAction: function() {
    Session.set('currentTicker', this.params.ticker);
    Session.set('currentPosition', this.params.position);
    this.next();
  }
});

Router.route('/:screen/:id', {
  name: 'screen',
  onBeforeAction: function() {
    Session.set('currentScreen', this.params.id);
    this.next();
  }
});
