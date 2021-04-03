import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience, onToggle }) => {
    const experiences = experience.map( exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment>-{' '}
                {exp.to === null ? (
                    ' Current'
                ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                )}
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <table className='table'>
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
            <button onClick = {onToggle}>Add</button>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Experience
