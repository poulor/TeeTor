import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addLike, removeLike, deletePost } from '../../actions/post';
import styles from './style/individualPost.module.css';
import SubmitComment from './SubmitComment';
import IndividualComment from './IndividualComment';

const IndividualPost = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, title, text, name, user, likes, comments, date },
}) => {

  var liked = false;
  var commented = false;
  let likeButton;
  let commentButton;

  const [commentFocused, focusComment] = useState(false);
  // const [comment, setComment] = useState('');

  var i;
  for (i = 0; i < likes.length; i++) {
    if(auth.user._id === likes[i].user) {
      liked = true;
    }
  }
  for (i = 0; i < comments.length; i++) {
    if(auth.user._id === comments[i].user) {
      commented = true;
    }
  }
  

  if(liked) {
    likeButton = <span onClick={()=> removeLike(_id)} className="fas fa-thumbs-up"></span>;
  } else {
    likeButton = <span onClick={()=> addLike(_id)} className="far fa-thumbs-up"></span>
  }

  if(commented) {
    commentButton = <span onClick={
      ()=> {
        focusComment(!commentFocused);
      }
    } className="fas fa-comment-alt"></span>
  } else {
    commentButton = <span onClick={()=> focusComment(!commentFocused)} className="far fa-comment-alt"></span>
  }

  return (
    <Fragment>
      <div className={styles.postContainer}>
        <div className={styles.indivPost}>
            <div className={styles.iconSec}>
              <img
                  className={styles.profileImg}
                  src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png' 
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
                  {commentButton}
                  <span className={styles.interCount}>{comments.length}</span>
                </div>
            </div>
        </div>
        {commentFocused && (
        <div className={styles.replySection}>
          <hr/>
          <SubmitComment postId={_id} />
        </div>
        )}
      </div>
      { commentFocused && (
        <div>
          {comments.length > 0 && (
            comments.map(comment => (
              <IndividualComment key={comment._id} comment={comment} postId={_id}/>
            ))
          )}
        </div>
      )}
    </Fragment>
  );
};

IndividualPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
    IndividualPost
);