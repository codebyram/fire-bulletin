import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import Post from './Post';

class PostList extends React.Component {
  render() {
    if (this.props.fetchingPosts) {
      return (
        <h3 className="text-center">Loading ... </h3>
      )
    } else {
      return (
          <div className="card-list-wrapper col-xs-12 col-md-8">
            <ul>
            {this.props.posts.map((post) => {
              return(
                <li key={post.id}>
                  <Post {...post} />
                </li>
              )
            })}
            </ul>
          </div>
      )
    }
  }
}

PostList.defaultProps = {
  fetchingPosts : true
}

const mapStateToProps = state => ({
  posts: state.posts,
  fetchingPosts: state.fetchingPosts,
  user: state.user.email
});

const mapDispatchToProps = dispatch => ({
  delete: (payload)=>{dispatch({type: actions.INIT_DELETE, payload: payload})},
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
