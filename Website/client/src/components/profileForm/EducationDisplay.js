import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import styles from './style/table.module.css';

const Education = ({ education, onToggle }) => {
    const educations = education.map( edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment>-{' '}
                {edu.to === null ? (
                    ' Current'
                ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <table className={styles.profileTable}>
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
            <button className = {styles.add} onClick = {onToggle}>Add</button>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Education
