import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

// Use mapStateToProps when we want to pull a value from the state, in this case updating isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Need to export connect with the component itself
// export default connect()(Landing);

// First parameter is any state that you want to map, second is an object with any actions you want to use with this component
export default connect(mapStateToProps)(Landing);
