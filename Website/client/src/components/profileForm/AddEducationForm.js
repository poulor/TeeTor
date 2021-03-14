import React, {Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

import styles from './style/profile.module.css';

const AddEducationForm = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>
            <div className="page">
                <div className={styles.formWrapper}>
                    <form id="addEducationForm" onSubmit={e => {
                        e.preventDefault();
                        addEducation(formData, history);
                    }}>

                        <h1 className={styles.fieldTitle}>School:</h1>
                        <div className="form-group">
                            <textarea
                            className={styles.input}
                            placeholder="School"
                            name="school"
                            value={school}
                            onChange={onChange}
                            />
                        </div>
                        <h1 className={styles.fieldTitle}>Degree:</h1>
                        <div className="form-group">
                            <textarea
                            className={styles.input}
                            placeholder="Degree"
                            name="degree"
                            value={degree}
                            onChange={onChange}
                            />
                        </div>
                        <h1 className={styles.fieldTitle}>Field of Study:</h1>
                        <div className="form-group">
                            <input
                            className={styles.input}
                            type="text"
                            placeholder="Field of Study"
                            name="fieldofstudy"
                            value={fieldofstudy}
                            onChange={onChange}
                            />
                        </div>
                        <h1 className={styles.fieldTitle}>Description:</h1>
                        <div className="form-group">
                            <input
                            className={styles.input}
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
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
                            onChange={e => {
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
                            disabled={toDateDisabled ? 'disabled' : ''}
                            />
                        </div>                    
                        <input type="submit" className={styles.submit} />
                        <br/>
                        <Link to="/AddExperience">
                            Return
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    );
};

AddEducationForm.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducationForm);
