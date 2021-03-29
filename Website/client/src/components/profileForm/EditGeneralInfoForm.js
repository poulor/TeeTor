import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { setAlert } from '../../actions/alert';

import styles from "./style/profile.module.css";

const EditGeneralInfoForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  setAlert,
}) => {
  const toggleType = {
    mentorChecked: false,
    menteeChecked: false,
  };

  const [formData, setFormData] = useState({
    teetorType: "",
    bio: "",
    location: "",
    languages: "",
    skills: "",
  });

  const [toggleData] = useState(toggleType);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    setFormData({
      teetorType: loading || !profile.teetorType ? '' : profile.teetorType,
      bio: loading || !profile.bio ? "" : profile.bio,
      location: loading || !profile.location ? "" : profile.location,
      languages:
        loading || !profile.languages ? "" : profile.languages.join(","),
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
    });

    var x = document.getElementById("menteeCircle");
    var y = document.getElementById("mentorCircle");

    // Set styling of the checkboxes
    if (profile.teetorType === 1){
      // adjust styling of checkboxes:
      x.classList.add(styles.expanded);
      y.classList.remove(styles.expanded);
      // toggles checkboxes based on profile data
      document.getElementById('toggle').checked = true;
      document.getElementById('toggle2').checked = false;
      toggleData.menteeChecked = true;
      toggleData.mentorChecked = false;
      
    }
    else if (profile.teetorType === 2){
      // adjust styling of checkboxes:
      y.classList.add(styles.expanded);
      x.classList.remove(styles.expanded);
      // toggles checkboxes based on profile data
      document.getElementById('toggle2').checked = true;
      document.getElementById('toggle').checked = false;
      toggleData.menteeChecked = false;
      toggleData.mentorChecked = true;
    }
    else if (profile.teetorType === 3){
      // adjust styling of checkboxes:
      x.classList.add(styles.expanded);
      y.classList.add(styles.expanded);
      // toggles checkboxes based on profile data
      document.getElementById('toggle').checked = true;
      document.getElementById('toggle2').checked = true;      
      toggleData.menteeChecked = true;
      toggleData.mentorChecked = true;
    }
  }, [loading, getCurrentProfile, profile, toggleData]);
  const { bio, location, languages, skills } = formData;

  // When the form is changed, update the state values:
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // On submission of form, check if either box was checked, using
  // checkTypes(). If neither box was checked, alert the user. Otherwise
  // submit the form as usual:
  const onSubmit = (e) => {
    e.preventDefault();
    let teetorType = checkTypes();
    if (teetorType === 0){
        setAlert('You must select mentor, mentee, or both', 'danger', 'top-right','10000');
        return;
    }
    createProfile(formData, history, true);
  };

  // This function ensures that either the box mentor box is checked,
  // the mentee box is checked, or both are checked. It sets the value of
  // formData.teetorType accordingly (1 for mentee checked, 2 for mentor checked,
  // and 3 for both checked). Also returns the teetorType value:
  const checkTypes = () => {
    let teetorType;
    let mentorChecked = toggleData.mentorChecked;
    let menteeChecked = toggleData.menteeChecked;
    if (menteeChecked && !mentorChecked) teetorType = 1;
    else if (!menteeChecked && mentorChecked) teetorType = 2;
    else if (menteeChecked && mentorChecked) teetorType = 3;
    else {
      teetorType = 0;
    }
    formData.teetorType = teetorType;

    return teetorType;
  };

  // When a checkbox is clicked, first check which box was clicked,
  // then perform the corresponding animation and update the formData
  // to reflect whether each box was checked.
  const onCheck = (type) => {
    var x = document.getElementById("mentorCircle");
    var y = document.getElementById("menteeCircle");

    var mentorChecked = toggleData.mentorChecked;
    var menteeChecked = toggleData.menteeChecked;

    if (type === "mentor") {
      if (!mentorChecked) x.classList.add(styles.expanded);
      else x.classList.remove(styles.expanded);
      toggleData.mentorChecked = !toggleData.mentorChecked;
    } else {
      if (!menteeChecked) y.classList.add(styles.expanded);
      else y.classList.remove(styles.expanded);
      toggleData.menteeChecked = !toggleData.menteeChecked;
    }
    checkTypes();
  };

  return (
    <Fragment>
      <div >
        <div className={styles.formWrapper}>
          <form id="editProfileForm" onSubmit={(e) => onSubmit(e)}>
            <h1 className={styles.fieldTitle}>I am a ...</h1>
            <br />
            <div className={styles.checkBoxesHolder}>
              <div className={styles.container}>
                <h3>Mentee</h3>
                <div
                  className={[styles.checkboxContainer, styles.mentee].join(
                    " "
                  )}
                >
                  <input
                    type="checkbox"
                    id="toggle"
                    className={styles.inputCheck}
                  />
                  <label
                    onClick={onCheck.bind(this, "mentee")}
                    htmlFor="toggle"
                  ></label>
                  <div id="menteeCircle" className={styles.activeCircle}></div>
                </div>
              </div>

              <div className={styles.container}>
                <h3>Mentor</h3>
                <div
                  className={[styles.checkboxContainer, styles.mentor].join(
                    " "
                  )}
                >
                  <input
                    type="checkbox"
                    id="toggle2"
                    className={styles.inputCheck}
                  />
                  <label
                    onClick={onCheck.bind(this, "mentor")}
                    htmlFor="toggle2"
                    className={styles.label}
                  ></label>
                  <div id="mentorCircle" className={styles.activeCircle}></div>
                </div>
              </div>
            </div>
            <br />

            <h1 className={styles.fieldTitle}>Bio:</h1>
            <div className="form-group">
              <textarea
                className={styles.input}
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Location:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Languages:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="text"
                placeholder="Languages"
                name="languages"
                value={languages}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Skills:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="text"
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={onChange}
              />
            </div>
            <input type="submit" className={styles.submit} />
            <br />
            <Link to="/dashboard">Return</Link>
            <br />
            <Link to="/ManageExperience">Manage Experiences</Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EditGeneralInfoForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  teetorType: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { setAlert, createProfile, getCurrentProfile })(
  withRouter(EditGeneralInfoForm)
);
