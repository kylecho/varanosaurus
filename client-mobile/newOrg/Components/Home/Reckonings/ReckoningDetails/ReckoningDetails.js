'use strict';

var React = require('react-native');

var {
  View,
  Text,
} = React;
var {connect} = require('react-redux'); // it became dumb component now

// var ReckoningItemsDetails = require('./ReckoningItemsDetails/ReckoningItemsDetails');
// var ReckoningUsersDetails = require('./dumb/ReckoningUsersDetails');
var Actions = require('../../../../Actions/Actions');

var ReckoningDetails = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchSelectedReckoning());
  },

  render() {
    if (!this.props.selectedReckoning.users) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>This is a Reckoning Details View</Text>
          <View>
            {this.props.selectedReckoning.users.map((userData) => {

              return (
                <View>
                  <Text>{userData.username} </Text>
                  <Text>contributed ${userData.userToReckoning.contribution} to the total </Text>
                  {this.getOwedText(userData.userToReckoning.debt)}
                </View>
              );

            })}
          </View>
        </View>
      );
    }
    // switch (this.props.reckoningsDetailsMode) {
    //   case 'items':
    //     return this.renderItemsDetails();
    //   case 'users':
    //     return this.renderUserDetails();
    //   default:
    //     return this.renderItemsDetails();
    // }
  },

  getOwedText(debt) {
    if (debt > 0) {
      return <Text>and owes ${debt}</Text>;
    } else if (debt < 0) {
      return <Text>and is owed ${Math.abs(debt)}</Text>;
    } else {
      return <Text>and is square!</Text>;
    }
  },

  // renderItemsDetails() {
  //   return (
  //     <ReckoningItemsDetails
  //       /* TODO: pass prop? */
  //       items={this.props.reckoning}
  //       onSelect={this.goToItemsDetailsView}
  //     />
  //   );
  // },

  // renderUsersDetails() {
  //   return (
  //     <ReckoningUsersDetails
  //       /* TODO: pass prop? */
  //       figures={this.props.reckoning.userFigures}
  //     />
  //   );
  // },

  // goToItemsDetailsView() {
  //   this.props.dispatch(Actions.setReckoningDetailsMode('items'));
  // },

  // goToUsersDetailsView() {
  //   this.props.dispatch(Actions.setReckoningDetailsMode('users'));
  // },

});

function select(state) {
  return {
    selectedReckoning: state.data.selectedReckoning,
  };
}

module.exports = connect(select)(ReckoningDetails);
