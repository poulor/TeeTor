import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/post';
import styles from "./style/individualComment.module.css";

const IndividualComment = ({
  postId,
  deleteComment,
  auth,
  comment: { _id, text, name, user, date },
}) => {
  // console.log(postId);
  // console.log(_id);
  return (
    <div className={styles.commentContainer}>

    <div className={styles.indivComment}>
        <div className={styles.iconSec}>
          <img
              className={styles.profileImg}
              src='https://vignette.wikia.nocookie.net/p__/images/d/d8/Hughie-The-Boys.png/revision/latest?cb=20190910184751&path-prefix=protagonist' 
              alt="profile"
              />
        </div>
        <div className={styles.contentSec}>
          <div className={styles.header}>
            <p className={styles.name}>
              {name}:
            </p>
            {!auth.loading && user === auth.user._id && (
              <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                <i className="fas fa-caret-down"></i>
              </button>
              <div className={styles.dropdownContent}>
              <a onClick={() => deleteComment(postId, _id)}>Delete 
                <i className="fas fa-minus-circle" style={{marginLeft: '50px'}}></i>
              </a>
              {/* <a href="#">Link 2</a>
              <a href="#">Link 3</a> */}
              </div>
            </div>
            )}
            <p className={styles.date}>
            <Moment format='MM/DD/YYYY'>{date}</Moment>
            </p>
          </div>
          <div className={styles.text}>
            {text}
          </div>
        </div>
    </div>
</div>
  );
};

IndividualComment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(
    IndividualComment
);