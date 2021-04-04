import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
        <div className="page">
            {loading ? (
                <p>Put loading anim here</p>
            ) : (
                <Fragment>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <p>{post.text}</p>
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