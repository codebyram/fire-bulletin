import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import PostForm from './PostForm';
import PostList from './PostList';

class Dashboard extends React.Component {
  componentWillMount(){
    this.setState({showForm : false});
  }

  render(){
    return (
      <div>
        {this.renderForm()}
        <div className="container">
          <div className="list-head  col-xs-12 col-md-8">
            <button className='button button--danger button--xl float-right' onClick={this.logOut.bind(this)} >Log Out</button>
            <button className='button button--xl' onClick={this.showPostForm.bind(this)} >Post</button>
          </div>
          <PostList />
        </div>
      </div>
    )
  }

  renderForm(){
    if (this.state.showForm) {
      return (
        <div className="over-lay">
          <PostForm onClose={this.closePostForm.bind(this)} onSubmit={this.postFormSubmitted.bind(this)} />
        </div>
      )
    }
  }

  showPostForm(){
    this.setState({showForm : true});
  }

  postFormSubmitted(payload){
    this.props.controller.post({
      ...payload,
      by: this.props.user.email,
      created_at: new Date().getTime()
    });
    this.closePostForm();
  }

  closePostForm(){
    this.setState({showForm : false});
  }

  logOut(e){
    e.preventDefault();
    this.props.logout();
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: (payload)=>{dispatch({type: actions.INIT_LOGOUT, payload: null})},
  fetchPosts: (payload)=>{dispatch({type: actions.INIT_FETCH, payload: null})},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
