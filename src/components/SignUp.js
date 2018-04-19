import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../helpers/actions';
import {Form, TextInput } from './form_components';



class SignUp extends React.Component {
  render(){
    let cPValidations = [{element: 'password',expr: 'equals'}];
    return (
      <div className="col-12">
        <div className="container">
          <div className='col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
            <div className="form-box col-12">
              <div className="form-head">
                <h2 className="page-sub-title">Sign Up</h2>
              </div>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-body col-12">
                  <TextInput className='col-12 pull-left'
                   required
                   name='displayName'
                   placeholder='Name'
                   type='text' />
                  <TextInput className='col-12 pull-left'
                    required
                    name='email'
                    placeholder='Email'
                    type='email' />
                  <TextInput className='col-12 pull-left'
                    required
                    name='password'
                    placeholder='Password'
                    type='password' />
                  <TextInput className='col-12 pull-left'
                    required
                    validations={cPValidations}
                    name='confirm_password'
                    placeholder='Confirm Password'
                    type='password' />
                  <div className="col-12 pull-left text-center">
                    {this.getButton()}
                    or
                    <a href="#" onClick={this.showLogIn.bind(this)}>Log In</a>
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
    if(this.props.isFetching)
      return(
        <button className='button button--xl' type="submit" disabled>Creating account...</button>
      )
    return(
      <button className='button button--xl' type="submit" >Sign Up</button>
    )
  }

  handleSubmit(data){
    if(this.props.isFetching)
      return;
    // this.props.signUp(data);
  }

  showLogIn(e){
    e.preventDefault();
    this.props.login();
  }

}

SignUp.propTypes = {
  isFetching: PropTypes.bool,
}

SignUp.defaultProps = {
  isFetching: false,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  login: ()=>{dispatch({type: actions.SHOW_LOG_IN, payload: {}})},
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
