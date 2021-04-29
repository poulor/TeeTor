import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

import styles from './style/submitPost.module.css';
import { setAlert } from '../../actions/alert';

const SubmitPost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [titleFocused, focusTitle] = useState(false);
  const [bodyFocused, focusBody] = useState(false);

  return (
    <div className={styles.submitPost}>
      <form 
        className={styles.postForm}
        onSubmit={e => {
          e.preventDefault();
          if(title === '') {
            setAlert('Post title required', 'danger');
          }
          if(text === '') {
            setAlert('Post body required', 'danger');
          }
          else {
            addPost({ title, text });
            setTitle('');
            setText('');
          }
        }}
      >
        <textarea
          required
          className={`${styles.input} ${styles.title}`}
          maxLength='50'
          name='title'
          cols='30'
          rows='1'
          placeholder='Title'
          value={title}
          id='titleID'
          onFocus={()=>focusTitle(true)}
          onBlur={()=>focusTitle(false)}
          onChange={e => setTitle(e.target.value)}
        />
        <input type='submit' 
          className={styles.submit} 
          value='Submit' />
        {(bodyFocused || titleFocused || text !== '' || title !== '') && 
          <textarea
          required
            className={`${styles.input} ${styles.body}`}
            name='text'
            cols='30'
            rows='5'
            placeholder='Body'
            value={text}
            id='textID'
            onMouseDown={()=>focusBody(true)}
            onBlur={()=>focusBody(false)}
            onChange={e => setText(e.target.value)}
            />
          }
      </form>
    </div>
  );
};

SubmitPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(SubmitPost);