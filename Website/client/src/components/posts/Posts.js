import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingAnim from '../layout/LoadingAnim';
import { getPosts } from '../../actions/post';
import IndividualPost from './IndividualPost';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  // getPosts();
  console.log('rerender');

  return (
    <Fragment>
        <div className="page">
            {loading ? (
                <LoadingAnim />
            ) : (
                <Fragment>
                  <div>Hello</div>
                  {/* <IndividualPost key={posts[0]._id} post = {posts[0]}/> */}
                    {posts.length > 0 ? (
                        posts.map(post => (
                          <IndividualPost key={post._id} post={post} />
                        ))
                    ) : (
                        <p>No Posts</p>
                    )}
                </Fragment>
            )        
        }
        </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);