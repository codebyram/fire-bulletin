import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import Post from './Post';

class PostList extends React.Component {
  render() {
    if (this.props.fetchingPosts) {
      return (
        <div className="card-list-wrapper col-xs-12 col-md-8">
          <h3 className="text-center">Loading ... </h3>
        </div>
      )
    } else {
      return (
          <div className="card-list-wrapper col-xs-12 col-md-8">
            <ul>
            {this.props.posts.map((post) => {
              if(this.props.user === post.by) {
                post = { ...post, canDelete : true, delete: this.props.delete };
              }
              return(
                <li key={post.id}>
                  <Post {...post}/>
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

});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
