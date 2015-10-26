'use strict';

var React = require('react-native');

var {connect} = require('react-redux');

var ReckoningItemsDetails = require('./ReckoningDetailList/ReckoningItemsDetailsController');
var ReckoningUsersDetails = require('./dumb/ReckoningUsersDetails');

var ReckoningDetails = React.createClass({

  // TODO: component fetches items and users data for reckoning upon mounting?

  render() {
    switch (this.props.reckoningsDetailsMode) {
      case 'items':
        return this.renderItemsDetails();
      case 'users':
        return this.renderUserDetails();
      default:
        return this.renderItemsDetails();
    }
  },

  renderItemsDetails() {
    return (
      <ReckoningItemsDetails
        /* TODO: pass prop? */
        items={this.props.reckoning.items}
        onSelect={this.goToItemsDetailsView}
      />
    );
  },

  renderUsersDetails() {
    return (
      <ReckoningUsersDetails
        /* TODO: pass prop? */
        figures={this.props.reckoning.userFigures}
      />
    );
  },

  goToItemsDetailsView() {
    // TODO: dispatch action state.uiMode.reckoningsDetailsMode -> 'items'
  },

  goToUsersDetailsView() {
    // TODO: dispatch action state.uiMode.reckoningsDetailsMode -> 'users'
  },

});

function select(state) {
  return {
    reckoningDetailsMode: state.uiMode.reckoningsDetailsMode,
  };
}

module.exports = connect(select)(ReckoningDetails);