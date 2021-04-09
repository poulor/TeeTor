import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
// import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';

import { addLike, removeLike, deletePost } from '../../actions/post';
import { post } from 'request';
import styles from "./style/individualPost.module.css";

const IndividualPost = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, title, text, name, user, likes, comments, date },
  showActions
}) => (
  <div className={styles.indivPost}>
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
          <p className={styles.title}>
            {title}
          </p>
          <p className={styles.date}>
          <Moment format='MM/DD/YYYY'>{date}</Moment>
          </p>
        </div>
        <div className={styles.text}>
            {`${text.substring(0, 170)}...`}
        </div>
          
      </div>
      <div className={styles.tagSec}>
          
      </div>
      <div className={styles.interactables}>
          
      </div>
  </div>
);

IndividualPost.defaultProps = {
  showActions: true
};

IndividualPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
    IndividualPost
);