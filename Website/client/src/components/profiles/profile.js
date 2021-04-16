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
      <tr rowSpan = "2" key={edu._id}>
        <td className={styles.rowBold}>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Current"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td className = {styles.breakCell} colSpan = "4">{edu.description}</td>
      </tr>

      </Fragment>
    ));

  const experiences =
    visitingProfile &&
    visitingProfile.experience.map((exp) => (
      <tr key={exp._id}>
        <td className={styles.rowBold}>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>{exp.description}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Current"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <div className="page">
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
                <div className={styles.bio}>
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

              <div className={styles.education}>
                <table className={styles.profileTable} cellSpacing="5px">
                  <thead>
                    <tr>
                      <th className = {styles.school}>School</th>
                      {/* Should probably hide some on smaller windows */}
                      <th className = {styles.degree}>Degree</th>
                      <th className = {styles.fieldOfStudy}>Field of Study</th>
                      <th className = {styles.years}>Years</th>
                    </tr>
                  </thead>
                  <tbody>{educations}</tbody>
                </table>
              </div>

              <div className={styles.experience}>
                <table className={styles.profileTable} cellSpacing="5px">
                  <thead>
                    <tr>
                      <th>Company</th>
                      {/* Should probably hide some on smaller windows */}
                      <th>Title</th>
                      <th>Location</th>
                      <th>Years</th>
                    </tr>
                  </thead>
                  <tbody>{experiences}</tbody>
                </table>
              </div>
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
