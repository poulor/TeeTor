import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

import styles from './style/table.module.css';
import { connect } from 'react-redux';

const EducationDisplay = ({ education, onToggle }) => {
    const educations = education.map( edu => (
        <tr key={edu._id}>
            <td className={styles.rowBold}>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to === null ? (
                    ' Current'
                ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}
            </td>
            <td className = {styles.deleteWrapper}>
                <i onClick={() => deleteEducation(edu._id)} className={styles.deleteButton}><i class="fas fa-minus-circle"></i></i>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <table className={styles.profileTable} cellSpacing="5px">
                <thead>
                    <tr>
                        <th>School</th>
                        {/* Should probably hide some on smaller windows */}
                        <th>Degree</th>
                        <th>Years</th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
            <div className = {styles.buttonWrapper}>
            <button className = {styles.add} onClick = {onToggle}>Add</button>
            </div>
        </Fragment>
    )
}

EducationDisplay.propTypes = {
    education: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationDisplay);

