import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogIn from './LogIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

class App extends React.Component {

  render(){
    console.log('rendering: '+this.props.user);
    if(this.props.user) {
      return(
        <h1>User present</h1>
      )
    } else if(this.props.showSignUp){
      return (
        <SignUp />
      )
    } else {
      return(
        <LogIn />
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  showSignUp: state.showSignUp
});

export default connect(mapStateToProps)(App);
