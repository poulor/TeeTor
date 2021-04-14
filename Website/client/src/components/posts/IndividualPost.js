import React, { useState } from 'react';
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
}) => {

  var liked = false;
  let likeButton;

  var i;
  for (i = 0; i < likes.length; i++) {
    if(auth.user._id === likes[i].user) {
      liked = true;
    }
  }
  

  if(liked) {
    likeButton = <span onClick={()=> removeLike(_id)} className="fas fa-thumbs-up"></span>;
  } else {
    likeButton = <span onClick={()=> addLike(_id)} className="far fa-thumbs-up"></span>
  }

  return (
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
            {!auth.loading && user === auth.user._id && (
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                <i className="fas fa-caret-down"></i>
              </button>
              <div className={styles.dropdownContent}>
              <a onClick={() => deletePost(_id)}>Delete 
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
        <div className={styles.tagSec}>
            <p className={styles.sub}>General Post</p>
        </div>
        <div className={styles.interactables}>
            <div className ={styles.likeSec}>
              {likeButton}
              <span className={styles.interCount}>{likes.length}</span>
            </div>
            <div className ={styles.shareSec}>
              <i className="fas fa-comment-alt"></i>
              <span className={styles.interCount}>{comments.length}</span>
            </div>
        </div>
    </div>
  );
};

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