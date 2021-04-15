import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingAnim from '../layout/LoadingAnim';
import { getProfileById } from '../../actions/profile';

import styles from './styles/profile.module.css';

const Profile = ({ getProfileById, profile: { visitingProfile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  // Given a teetorType, return a title
  const getTitle = (teetorType) => {
    let title;

    if (teetorType === 1) title = "Mentee";
    else if (teetorType === 2) title = "Mentor";
    else if (teetorType === 3) title = "Mentee and Mentor";

    return title;
  }
  
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

                    <div className = {styles.body}>
                      <div className = {styles.genInfo}>
                        <div className = {styles.nameWrapper}>
                          <img className = {styles.profileImage} src = 'https://img1.looper.com/img/gallery/how-hughie-from-the-boys-should-really-look/intro-1603561090.jpg' alt = 'profile image'/>
                          <h1 className = {styles.name}>{visitingProfile.user.name}</h1>
                          <h3 className = {styles.title}>{getTitle(visitingProfile.teetorType)}</h3>
                        </div>
                        <div className = {styles.bio}>
                          <h2 className = {styles.bio}>{visitingProfile.bio}</h2>
                          <div className = {styles.tags}>
                            {visitingProfile.languages.map ( (language) => (
                              <p className = {styles.tag}>{language}</p>
                            ))}
                          </div>
                          <div className = {styles.tags}>
                            {visitingProfile.skills.map ( (skill) => (
                              <p className = {styles.tag}>{skill}</p>
                            ))}
                          </div>
                        </div>
                        
                      </div>
                      <div className = {styles.education}>

                      </div>

                      <div className = {styles.experience}>

                      </div>

                      
                    </div>



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