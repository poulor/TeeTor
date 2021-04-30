import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingAnim from '../layout/LoadingAnim';
import { getProfiles } from '../../actions/profile';
import Card from '../profileForm/myCard';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
        <div className="page">
            {loading ? (
                <LoadingAnim />
            ) : (
                <Fragment>
                    <div className='profiles'>
                        {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <Card 
                                key = {profile.user._id}
                                userId = {profile.user._id}
                                type = "mentor"
                                name = {profile.user.name}
                                title = "Student" 
                                bio = {profile.bio}
                                url = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" 
                                skills = {profile.skills}
                                rating = {3.5}
                            />
                        )
                    )
                        ) : (
                        <h1>No profiles found...</h1>
                        )}
                    </div>
                </Fragment>
            )}
        </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);