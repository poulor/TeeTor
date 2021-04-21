import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

import styles from './style/table.module.css';
import { connect } from 'react-redux';

const ExperienceDisplay = ({experience, onToggle, deleteExperience}) => {
    const experiences = experience.map( exp => (
        <tr key={exp._id}>
            <td className={`${styles.rowBold} ${styles.wordBreak}`}>{exp.company}</td>
            <td className = {styles.wordBreak}>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    ' Current'
                ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>
            <td className = {styles.deleteWrapper}>
                <i onClick={() => deleteExperience(exp._id)} className={styles.deleteButton}><i className="fas fa-minus-circle"></i></i>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <table className={styles.profileTable} cellSpacing="5px">
                <thead>
                    <tr>
                        <th>Company</th>
                        {/* Should probably hide some on smaller windows */}
                        <th>Title</th>
                        <th>Years</th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
            <div className = {styles.buttonWrapper}>
                <button className = {styles.add} onClick = {onToggle}>Add</button>
            </div>
        </Fragment>
    );
};

ExperienceDisplay.propTypes = {
    experience: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceDisplay);

