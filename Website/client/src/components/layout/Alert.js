import React from 'react';
import PropTypes from 'prop-types';
// Import connect when you want to access from the redux store
import { connect } from 'react-redux';

// Destructuring the alerts taken from the state using mapStateToProps below
const Alert = ({ alerts }) =>
  // As long as its not empty, map all the alerts to divs with keys and styling --- and content taken from the alert.msg
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // Want to return a div for each alert
    // Whenever you map through an array like this and output jsx, you need to have a key. In this case its the alert id generated in actions
    <div key={alert.id} className={'alert alert-' + alert.alertType}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// Want to get state and put it into the component props
const mapStateToProps = (state) => ({
  //What state we want from the root reducer
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
