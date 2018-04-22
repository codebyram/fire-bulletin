import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import {Form, TextInput } from './form_components';

class LogIn extends React.Component {

  render(){
    return(
      <div className="col-12">
        <div className="container">
          <div className='col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
            <div className="form-box col-12">
              <div className="form-head">
                <h2 className="page-sub-title">Log In</h2>
              </div>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-body col-12">
                <TextInput className='col-12 pull-left'
                 required
                 name='email'
                 placeholder='Registered Email'
                 value=''
                 type='email' />
               <TextInput className='col-12 pull-left'
                 required
                 name='password'
                 placeholder='Password'
                 value=''
                 type='password' />
                  <div className="col-12 pull-left text-center">
                  {this.getButton()}
                  or
                  <a href="#" onClick={this.showSignUp.bind(this)}>Sign Up</a>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getButton(){
    if (this.props.isFetching) {
      return(
        <button className='button button--xl' type="submit" disabled>Loading</button>
      )
    }
    return(
      <button className='button button--xl' type="submit" >Log In</button>
    )
  }

  handleSubmit(data){
    this.props.login(data);
  }

  showSignUp(e){
    e.preventDefault();
    this.props.signup();
  }
}



LogIn.propTypes = {
  isFetching: PropTypes.bool,
  login: PropTypes.func
}

LogIn.defaultProps = {
  isFetching: false,
  login: ()=>{},
};

const mapStateToProps = state => ({
  isFetching: state.fetchingLogin,
});

const mapDispatchToProps = dispatch => ({
  login: (payload)=>{dispatch({type: actions.INIT_LOG_IN, payload: payload})},
  signup: ()=>{dispatch({type: actions.SHOW_SIGN_UP, payload: {}})}
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
