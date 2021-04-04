import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingAnim from '../layout/LoadingAnim';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { visitingProfile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
        <div className="page">
            {visitingProfile === null ? (
                <LoadingAnim />
            ) : (
                <Fragment>
                    <Link to="/dashboard" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    <br/>
                    {/* Current User */}
                    {auth.user._id}
                    <br/>
                    {/* Visiting User */}
                    {visitingProfile.user._id}
                    {/* If same... include a button to edit the profile */}
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === visitingProfile.user._id && (
                        <Link to="/editprofile">
                            Edit Profile
                        </Link>
                        )}
                </Fragment>
            )}
        </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);