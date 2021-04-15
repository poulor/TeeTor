import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IndividualComment from './IndividualComment';

const Comments = ({ comments }) => {

  return (
    <Fragment>
        {posts.length > 0 ? (
            posts.map(post => (
              <IndividualPost key={post._id} post={post} reply='true'/>
            ))
        ): (
          <p>Nothing to see here folks</p>
        )
      }
      </Fragment>
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);