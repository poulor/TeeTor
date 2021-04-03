import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

import styles from "./style/profile.module.css";

const AddExperienceForm = ({ addExperience, history, onToggle }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <div >
        <div className={styles.formWrapper}>
          <form
            id="addExperienceForm"
            onSubmit={(e) => {
              e.preventDefault();
              addExperience(formData, history);
              console.log('Submitting experience');
            }}
          >
            <h1 className={styles.fieldTitle}>Job Title</h1>
            <div className="form-group">
              <textarea
                className={styles.input}
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Description</h1>
            <div className="form-group">
              <textarea
                className={styles.input}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Company:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="text"
                placeholder="Company"
                name="company"
                value={company}
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
            <h1 className={styles.fieldTitle}>From Date:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="date"
                name="from"
                value={from}
                onChange={onChange}
              />
            </div>
            <h1 className={styles.fieldTitle}>Current</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="checkbox"
                name="current"
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />
            </div>
            <h1 className={styles.fieldTitle}>To Date:</h1>
            <div className="form-group">
              <input
                className={styles.input}
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={toDateDisabled ? "disabled" : ""}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                onClick={onToggle}
                className={styles.submit}
              >
                Submit
              </button>
            </div>
            <br />
            </form>
        </div>
      </div>
    </Fragment>
  );
};

AddExperienceForm.propTypes = {
  addExperience: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperienceForm);
