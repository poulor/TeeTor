import React from 'react';
import PropTypes from 'prop-types';
// Import connect when you want to access from the redux store
import { connect } from 'react-redux';

<<<<<<< HEAD
import { removeAlert } from '../../actions/alert'

// first parameter: message
// second parameter: alertType
// third parameter: position on screen
// fourth parameter: timeout for alert in ms
// setAlert('Enter valid email!', 'danger', 'top-right', 10000);
// setAlert('Don't do that', 'warning', 'top-left', 4000);
// setAlert('This is a message', 'success', 'bottom-right', 15000);
// setAlert('We love spaghetti code', 'danger', 'bottom-left', 2000);
=======
// first parameter: message
// second paramter: alertType
// third parameter: position on screen
// fourth paramter: timeout for alert in ms
// setAlert('top-right', 'danger', 'top-right', 10000);
// setAlert('top-left', 'warning', 'top-left', 4000);
// setAlert('This is a message', 'success', 'bottom-right', 15000);
// setAlert('bottom-left', 'danger', 'bottom-left', 2000);
>>>>>>> 526c688fd89630ba2e33cb68650be8fce028d838
// setAlert('Wrong password', 'danger', 'top-right', 8000);
// setAlert('This will be in the center', 'danger', 'center', 16000);
// third and fourth parameter will default to 'top-right' and 4000
// setAlert('Testing Default', 'danger');

// Destructuring the alerts taken from the state using mapStateToProps below
<<<<<<< HEAD
const Alert = ({ alerts, removeAlert }) =>
// const Alert = ({ alerts }) =>
=======
const Alert = ({ alerts }) =>
>>>>>>> 526c688fd89630ba2e33cb68650be8fce028d838
  // As long as its not empty, map all the alerts to divs with keys and styling --- and content taken from the alert.msg
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // Want to return a div for each alert
    // Whenever you map through an array like this and output jsx, you need to have a key. In this case its the alert id generated in actions
<<<<<<< HEAD
    <div className='alertBox' key={alert.id}>
      <div className={'alert alert-' + alert.alertType + ' alert-' + alert.position} id={alert.id}>
        <div className='alertXButton' onClick= {() => removeAlert(alert.id)}>
          <i className="fas fa-times"></i>
        </div>
        {alert.msg}
      </div>
=======
    <div key={alert.id} className={'alert alert-' + alert.alertType + ' alert-' + alert.position}>
      {alert.msg}
>>>>>>> 526c688fd89630ba2e33cb68650be8fce028d838
    </div>

  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
<<<<<<< HEAD
  removeAlert: PropTypes.func.isRequired,
};

=======
};



>>>>>>> 526c688fd89630ba2e33cb68650be8fce028d838
// Want to get state and put it into the component props
const mapStateToProps = (state) => ({
  //What state we want from the root reducer
  alerts: state.alert,
});

<<<<<<< HEAD
export default connect(mapStateToProps, {removeAlert})(Alert);
=======
export default connect(mapStateToProps)(Alert);
>>>>>>> 526c688fd89630ba2e33cb68650be8fce028d838
