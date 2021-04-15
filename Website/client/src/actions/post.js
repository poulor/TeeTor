import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Add post
export const addPost = formData => async dispatch => {
    try {
        const res = await axios.post('/api/posts', formData);

        dispatch({
        type: ADD_POST,
        payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
  
  // Add comment
export const addComment = (postId, formData) => async dispatch => {
    try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
        type: ADD_COMMENT,
        payload: {postId, comments: res.data}
    });

    dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
    dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
    });
    }
};

// like a post
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
        });

        return true;
    } catch (err) {

        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: {postId, commentId}
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    console.log(err);
    if(err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Remove like from post
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });

    return false;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete a post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
        type: DELETE_POST,
        payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
