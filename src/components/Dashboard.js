import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <h1>Your bulleting dashboard</h1>
        <a href="#" onClick={this.logOut.bind(this)}>Log out</a>
        <br />
        <a href="#" onClick={this.showPostForm.bind(this)}>Post</a>
      </div>
    )
  }

  logOut(e){
    e.preventDefault();
    this.props.logout();
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  logout: (payload)=>{dispatch({type: actions.INIT_LOGOUT, payload: null})},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
