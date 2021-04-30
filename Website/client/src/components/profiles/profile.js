import React, { Fragment, useEffect } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadingAnim from "../layout/LoadingAnim";
import { getProfileById } from "../../actions/profile";

import styles from "./styles/profile.module.css";

const Profile = ({
  getProfileById,
  profile: { visitingProfile },
  auth,
  match,
}) => {
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
  };

  const educations =
    visitingProfile &&
    visitingProfile.education.map((edu) => (
      <Fragment>
        <div className={styles.education}>
          <div className={`${styles.institution} ${styles.tableItem}`}>{edu.school}</div>
          <div className={`${styles.degTit} ${styles.tableItem}`}>{edu.degree}</div>
          <div className={`${styles.fieLoc} ${styles.tableItem}`}>{edu.fieldOfStudy}</div>
          <div className={`${styles.duration} ${styles.tableItem}`}>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}          
            {edu.to === null ? (
              " Current"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </div>

          <div className={styles.desc}>{edu.description}</div>
        </div>
      </Fragment>
    ));

  const experiences =
    visitingProfile &&
    visitingProfile.experience.map((exp) => (
      <div key={exp._id} className={styles.experience}>
        <div className={`${styles.institution} ${styles.tableItem}`}>{exp.company}</div>
        <div className={`${styles.degTit} ${styles.tableItem}`}>{exp.title}</div>
        <div className={`${styles.fieLoc} ${styles.tableItem}`}>{exp.location}</div>
        <div className={`${styles.duration} ${styles.tableItem}`}>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Current"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </div>
        <div className={styles.desc}>{exp.description}</div>
      </div>
    ));

  return (
    <Fragment>
      <div className = "page">
        {visitingProfile === null ? (
          <LoadingAnim />
        ) : (
          <Fragment>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", marginBottom: "50px" }}
              className="btn btn-light fas fa-chevron-left"
            >
              Back To Profiles
            </Link>
            <br />

            <div className={styles.body}>
              <div className={styles.genInfo}>
                <div className={styles.nameWrapper}>
                  <img
                    className={styles.profileImage}
                    src="https://img1.looper.com/img/gallery/how-hughie-from-the-boys-should-really-look/intro-1603561090.jpg"
                    alt="profile image"
                  />
                  <h1 className={styles.name}>{visitingProfile.user.name}</h1>
                  <h3 className={styles.title}>
                    {getTitle(visitingProfile.teetorType)}
                  </h3>
                </div>
                <div className={styles.rightSec}>
                  <h2 className={styles.bio}>{visitingProfile.bio}</h2>
                  <div className={styles.tags}>
                    {visitingProfile.languages.map((language) => (
                      <p className={styles.tag}>{language}</p>
                    ))}
                  </div>
                  <div className={styles.tags}>
                    {visitingProfile.skills.map((skill) => (
                      <p className={styles.tag}>{skill}</p>
                    ))}
                  </div>
                </div>

                {/* If same... include a button to edit the profile */}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === visitingProfile.user._id && (
                    <Link
                      to="/editprofile"
                      style={{ textDecoration: "none" }}
                      className="fas fa-cog"
                    ></Link>
                  )}
              </div>
              
              {visitingProfile.education.length !== 0 && 
              <div className={styles.tableHeader} >
                    <div className={styles.school}>School</div>
                    {/* Should probably hide some on smaller windows */}
                    <div className={styles.degree}>Degree</div>
                    <div className={styles.fieldOfStudy}>Field of Study</div>
                    <div className={styles.years}>Years</div>
              </div>}
              <Fragment>{educations}</Fragment>

              {visitingProfile.experience.length !== 0 && 
              <div className={styles.tableHeader}>
                <div className={styles.institution}>Company</div>
                {/* Should probably hide some on smaller windows */}
                <div className={styles.degTit}>Title</div>
                <div className={styles.fieLoc}>Location</div>
                <div className={styles.duration}>Years</div>
              </div>}

              <Fragment>{experiences}</Fragment>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
