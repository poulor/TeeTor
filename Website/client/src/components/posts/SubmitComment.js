import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

import styles from './style/submitComment.module.css';
import { setAlert } from '../../actions/alert';

const SubmitComment = ({ postId, addComment, update }) => {
  const [text, setText] = useState('');

  return (
    <div className={styles.submitComment}>
      <form 
        className={styles.commentForm}
        onSubmit={e => {
          e.preventDefault();
          var span2 = document.getElementById('commentID');
          if(text === '') {
            setAlert('Comment body required', 'danger');
          }
          else {
            addComment( postId, {text} );
            setText('');
            span2.innerText = '';
          }
        }}
      >
        <span
          required
          className={styles.input}
          role='textbox'
          contentEditable
          name='text'
          placeholder='Add a comment...'
          value={text}
          id='commentID'
          onKeyUp={() => {
            var span = document.getElementById('commentID');
            setText(span.innerText);
          }}
        />
        <input type='submit' 
          className={styles.submit} 
          value='Post' />
      </form>
    </div>
  );
};

SubmitComment.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addComment }
)(SubmitComment);